import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// --- Type definitions remain the same for robust code ---
type TransportOption = 'car' | 'motorcycle' | 'public' | 'bike' | 'walk';
type EnergyOption = 'renewable' | 'mixed' | 'nonrenewable';
type DietOption = 'vegan' | 'veg' | 'omnivore' | 'heavyMeat';
type RecycleOption = 'always' | 'sometimes' | 'never';
type PlasticUseOption = 'none' | 'sometimes' | 'daily';

interface EcoForm {
  transport: TransportOption | null;
  dailyKm: number;
  flightsPerYear: number;
  energySource: EnergyOption | null;
  diet: DietOption | null;
  recycle: RecycleOption | null;
  plasticUse: PlasticUseOption | null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  footprintResult: number | null = null;

  
  
  // --- NEW: Logic for multi-step wizard ---
  currentStep = 0;
  steps = [
    { key: 'transport', title: 'What is your primary mode of transport?' },
    { key: 'dailyKm', title: 'On average, how many kilometers do you drive daily?' },
    { key: 'flightsPerYear', title: 'How many round-trip flights do you take per year?' },
    { key: 'energySource', title: 'What is your home\'s primary energy source?' },
    { key: 'diet', title: 'Which best describes your diet?' },
    { key: 'recycle', title: 'How often do you recycle?' },
    { key: 'plasticUse', title: 'How would you describe your single-use plastic consumption?' }
  ];

  // --- Score weights remain the same ---
  private scoreWeights = {
    transport: { car: 8, motorcycle: 5, public: 3, bike: 0, walk: 0 },
    energySource: { nonrenewable: 10, mixed: 5, renewable: 1 },
    diet: { heavyMeat: 10, omnivore: 7, veg: 4, vegan: 2 },
    recycle: { never: 5, sometimes: 2, always: 0 },
    plasticUse: { daily: 5, sometimes: 2, none: 0 },
  };

  constructor(private fb: FormBuilder,private router : Router) {
    // Form initialization is the same
    this.form = this.fb.group({
      transport: [null, Validators.required],
      dailyKm: [10, Validators.required],
      flightsPerYear: [2, Validators.required],
      energySource: [null, Validators.required],
      diet: [null, Validators.required],
      recycle: [null, Validators.required],
      plasticUse: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  // --- NEW: Functions to navigate between steps ---
  nextStep() {
    const currentControlName = this.steps[this.currentStep].key;
    const currentControl = this.form.get(currentControlName);

    if (currentControl?.invalid) {
      currentControl.markAsTouched();
      return;
    }

    // Logic to skip the 'dailyKm' step if not needed
    if (currentControlName === 'transport') {
      const transportValue = this.form.get('transport')?.value;
      if (transportValue !== 'car' && transportValue !== 'motorcycle') {
        this.currentStep += 2; // Skip 'dailyKm' step
        return;
      }
    }
    
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    // Logic to correctly go back if 'dailyKm' was skipped
    const previousStepKey = this.steps[this.currentStep - 1].key;
     if (previousStepKey === 'dailyKm') {
        const transportValue = this.form.get('transport')?.value;
        if (transportValue !== 'car' && transportValue !== 'motorcycle') {
            this.currentStep -= 2; // Skip back over 'dailyKm'
            return;
        }
     }

    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // --- The final calculation logic is the same ---
  onSubmit(): void {
    if (this.form.invalid) {
      alert('Please ensure all questions are answered correctly.');
      return;
    }
    this.calculateFootprint();
    this.saveToLocalStorage();
  }

  // Helper to get the total number of steps for the progress bar
  get totalSteps(): number {
    return this.steps.length;
  }

  // Helper to get the title for the current step
  get currentTitle(): string {
    return this.steps[this.currentStep].title;
  }

  private calculateFootprint(): void {
  const values = this.form.value;

  let score = 0;

  // Transport


  // Add dailyKm penalty if using car or motorcycle
  if (values.transport === 'car' || values.transport === 'motorcycle') {
    score += Math.min(values.dailyKm / 10, 10); // e.g. +1 per 10 km
  }

  // Flights per year (5 points per flight as example)
  score += (values.flightsPerYear || 0) * 5;

  score += this.scoreWeights.transport[values.transport as TransportOption] ?? 0;
score += this.scoreWeights.energySource[values.energySource as EnergyOption] ?? 0;
score += this.scoreWeights.diet[values.diet as DietOption] ?? 0;
score += this.scoreWeights.recycle[values.recycle as RecycleOption] ?? 0;


  // Save locally in the component (optional)
  this.footprintResult = Math.round(score);

  // Save to localStorage
  this.saveToLocalStorage();

  // Navigate to result page
  this.router.navigate(['/result']);
}


private saveToLocalStorage(): void {
  const formValues = this.form.value;
  const payload = { ...formValues, score: this.footprintResult };
  localStorage.setItem('eco_footprint_score', JSON.stringify(payload));
}


private loadFromLocalStorage(): void {
  const raw = localStorage.getItem('eco_footprint_score');
  if (raw) {
    const saved = JSON.parse(raw);
    // Patch only the fields that exist in your form
    this.form.patchValue({
      transport: saved.transport,
      dailyKm: saved.dailyKm,
      flightsPerYear: saved.flightsPerYear,
      energySource: saved.energySource,
      diet: saved.diet,
      recycle: saved.recycle,
      plasticUse: saved.plasticUse,
    });
    this.footprintResult = saved.score ?? null;
  }
}

}