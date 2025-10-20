import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-point',
  templateUrl: './edit-point.page.html',
  styleUrls: ['./edit-point.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class EditPointPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);
  private formBuilder = inject(FormBuilder);

  pointKey!: string;
  point: any;
  editPointForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.pointKey = this.route.snapshot.paramMap.get('key') as string;
    this.editPointForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.dataService.getPoint(this.pointKey).then((snapshot) => {
      if (snapshot.exists()) {
        this.point = snapshot.val();
        this.editPointForm.patchValue({
          name: this.point.name
        });
      }
    });
  }

  async updatePoint() {
    if (this.editPointForm.valid) {
      await this.dataService.updatePoint(this.pointKey, this.editPointForm.value);
      this.router.navigate(['/tabs/tab2']);
    }
  }
}