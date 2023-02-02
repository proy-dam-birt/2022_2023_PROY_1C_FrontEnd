import { PerfilesService } from './../../services/perfiles.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, RangeCustomEvent } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { RangeValue } from '@ionic/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pagina-perfiles',
  templateUrl: './pagina-perfiles.page.html',
  styleUrls: ['./pagina-perfiles.page.scss'],
})
export class PaginaPerfilesPage implements OnInit {
  
  results: Observable<any>;
  searchTerm: string = '';
  public items: any;


  @ViewChild(IonModal) modal: IonModal;
  message: string;
  name: string;
  lastEmittedValue: RangeValue;

  isModalOpen = false;

  constructor(private perfilesService: PerfilesService) { }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  confirmarFiltro() {

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Precio maximo:, ${ev.detail.data}!`;
    }
  }
  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }


  ngOnInit() {
    this.perfilesService.searchData().subscribe(res =>  {
      this.items = res;
  });
}
  

}
