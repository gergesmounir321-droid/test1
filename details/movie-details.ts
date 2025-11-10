
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from '../../services/details';
import { Imovie } from '../../interfaces/imovie';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
 movie?: Imovie;
  recommendedMovies: Imovie[] = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _Details: Details
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadMovie(id);
      }
    });
  }

  private loadMovie(id: string): void {
    this._Details.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie = data;
        this.loadRecommended(id);
        // 👇 scroll to top each time
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => console.error('Error loading movie:', err),
    });
  }

  private loadRecommended(id: string): void {
    this._Details.getRecommendedMovies(id).subscribe({
      next: (res) => {
        this.recommendedMovies = res.results || [];
      },
      error: (err) => console.error('Error loading recommended:', err),
    });
  }
  goToMovie(id: number): void {
    this._Router.navigate(['/movie', id]);
  }
}
