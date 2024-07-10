import { Component, OnDestroy, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-property-page',
  templateUrl: './property-page.component.html',
  styleUrl: './property-page.component.css'
})
export class PropertyPageComponent implements OnDestroy {

  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  })

  public fullname = computed(()=> `${this.user().first_name} ${this.user().last_name}`)

  public counter = signal(10)

  public userChangeEffect = effect(()=>{
    console.log(`${this.user().first_name} - ${this.counter()}`);
  })

  ngOnDestroy(): void {
    this.userChangeEffect.destroy()
  }

  onFieldUpdated(field: keyof User, value: string){
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }))

    this.user.update( current => {
      switch( field ) {
        case 'email':
          current.email = value
          break;
        case 'avatar':
          current.avatar = value
          break;
        case 'first_name':
          current.first_name = value
          break;
        case 'last_name':
          current.last_name = value
          break;
        case 'id':
          current.id = Number(value)
      }

      return current
    })
    // this.user.update( current => {

    //   const updatedUser = { ...current };

    //   switch( field ) {
    //     case 'email':
    //       updatedUser.email = value
    //       break;
    //     case 'avatar':
    //       updatedUser.avatar = value
    //       break;
    //     case 'first_name':
    //       updatedUser.first_name = value
    //       break;
    //     case 'last_name':
    //       updatedUser.last_name = value
    //       break;
    //     case 'id':
    //       updatedUser.id = Number(value)
    //   }

    //   return updatedUser
    // })
  }

  increaseBy(value: number){
    this.counter.update((current) => current + value)
  }

}
