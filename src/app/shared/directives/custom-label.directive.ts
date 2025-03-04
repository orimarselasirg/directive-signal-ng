import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>
  private _color: string = 'red'
  private _errors?:  ValidationErrors | null

  @Input()
  public set color(value: string){
    this._color = value
    this.setStyle()
  }

  @Input()
  public set errors(error: ValidationErrors | null | undefined) {
    this._errors = error
    this.setErrorMessage()
    console.log(error);
  }

  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element
    // this.htmlElement.nativeElement.innerHTML = 'Prueba'
  }
  ngOnInit(): void {
    this.setStyle()
  }

  setStyle(): void{

    if(!this.htmlElement) return

    this.htmlElement!.nativeElement.style.color = this._color
  }

  setErrorMessage():void{
    if(!this.htmlElement) return

    if(!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores'
      return
    }

    const errors = Object.keys(this._errors)

    if(errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido'
      // return
    }

    if(errors.includes('minLength')) {
      this.htmlElement.nativeElement.innerText = 'Minimo debe tener 6 caracteres'
      // return
    }

    if(errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'Debe ser un email'
      // return
    }


  }


}
