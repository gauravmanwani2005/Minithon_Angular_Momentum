import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: number = 0;
  category: 'Low' | 'Medium' | 'High' = 'Low';
  tips: string[] = [];
  percentage: number = 0;

  ngOnInit(): void {
    // load the score from localStorage (set in your FormComponent)
    const raw = localStorage.getItem('eco_footprint_score');
    if (raw) {
      const saved = JSON.parse(raw);
      this.score = saved.score ?? 0;
      this.category = this.getCategory(this.score);
      this.percentage = Math.min(this.score, 100);
      this.tips = this.generateTips(saved);
    }
  }

  getCategory(score: number): 'Low' | 'Medium' | 'High' {
    if (score <= 20) return 'Low';
    if (score <= 40) return 'Medium';
    return 'High';
  }

  categoryColor(): string {
    switch (this.category) {
      case 'Low': return '#66bb6a';
      case 'Medium': return '#ffa000';
      case 'High': return '#e53935';
      default: return '#ccc';
    }
  }

  generateTips(data: any): string[] {
    const tips: string[] = [];
    // very basic example — you can improve the logic
    if (data.transport === 'car') tips.push('Try public transport or carpooling to reduce emissions.');
    if (data.energySource === 'nonrenewable') tips.push('Switch to renewable energy sources where possible.');
    if (data.diet === 'heavyMeat' || data.diet === 'omnivore') tips.push('Include more plant-based meals.');
    if (data.recycle !== 'always') tips.push('Recycle more consistently and reduce waste.');
    if (data.plasticUse !== 'none') tips.push('Cut down on single-use plastics.');
    if (tips.length === 0) tips.push('Great job! Your habits are very eco-friendly.');
    return tips;
  }
}
