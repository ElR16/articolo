import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { partition } from 'rxjs';
import { ArticoloService } from 'src/app/shared/services/articolo.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-articolo',
  templateUrl: './articolo.component.html',
  styleUrls: ['./articolo.component.scss']
})
export class ArticoloComponent implements OnInit {

  mediaImage: string | ArrayBuffer | null | undefined;
  destinationID: string[] = ['Roma', 'Varese', 'Viterbo', 'Ancona', 'Lugano', 'Francoforte', 'Siviglia']
  lingue: string[] = ['italiano', 'spagnolo', 'tedesco'];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service : ArticoloService,
    private snackBar: MatSnackBar ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      lingua: ['', [Validators.required]],
      title: ['', [Validators.required, this.maxWordsValidator(15)]],
      subtitle: ['', this.maxWordsValidator(17)],
      description: ['', [Validators.required]],
      destinationID: ['', [Validators.required]],
      mediaImage: [null, [Validators.required]],
      mediaImageFile:[null,[Validators.required]],
      paragrafi: this.fb.array([this.createParagraph()])
    });


  }

  onSubmit() {
   
    
    if (this.form.valid) {
    
      
      
      this.service.postArticle(this.form.value).subscribe(
        
      )
      this.snackBar.open('Inserimento avvenuto con successo!', 'Chiudi', { 
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      })
    }
  }
  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return control && control.errors && control.errors[errorName];
  }
  countWords(text: string): number {
    return text ? text.trim().split(/\s+/).length : 0;
  }
  maxWordsValidator(maxWords: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const text = control.value as string;
      const wordCount = this.countWords(text);
      return wordCount > maxWords ? { maxWords: { maxWords, actualWords: wordCount } } : null;
    };
  }
  onFileSelected(event: any,formControl:AbstractControl): void {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')){
      const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(img.src);

      if (width > 1600 || height > 1000) {
        alert('L\'immagine supera le dimensioni massime consentite di 1600x1000 pixel.');
        event.target.value = '';
        return;
      }
      if (file) {
        formControl.patchValue(file)
      } 

    }
    
    }
    else {
      alert('Per favore, seleziona un file di immagine.');
      event.target.value = '';
    }
  }
  onFileSelectedParagrafi(event: any,index:number): void{
    
    this.onFileSelected(event,this.paragrafi.at(index).get('mediaImageFile')!)
  }
  onFileSelectedArticolo(event: any): void{
    this.onFileSelected(event,this.form.get('mediaImageFile')!)
  }
  createParagraph(): FormGroup {

    return this.fb.group({
      paragraphTitle: ['', Validators.required],
      mediaImage: [null, Validators.required],
      paragraphText: ['', Validators.required],
      destinationID: ['', Validators.required],
      mediaImageFile:[null,[Validators.required]],
    });
  }

  get paragrafi(): FormArray {
    return this.form.get('paragrafi') as FormArray;
  }

  addParagraph(): void {
    this.paragrafi.push(this.createParagraph());
  }

  removeParagraph(index: number): void {

    
    
    if (this.paragrafi.length > 1) {
      this.paragrafi.removeAt(index);
    }
  }
  resetParagraph(index: number): void {
    this.paragrafi.at(index).reset()
  }
}

