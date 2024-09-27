import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "src/app/services/transaction/transaction.service";
import {MoyenPayment, TransactionInterface, TransactionStatus} from "src/app/models/transaction.interface";
import {PersonneInterface} from "src/app/models/personne.interface";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {UtilsService} from "../../../../services/utils/utils.service";
import {ProfilService} from "../../../../services/Profil/profil.service";

/*
import {
  DomPortalOutlet,
  PortalOutlet,
  TemplatePortal
} from "@angular/cdk/portal";
*/


@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.sass']
})
export class DetailFactureComponent implements OnInit {

  listMoyenPayment = [
    {
      libelle: "Orange Money",
      code: "ORANGE_MONEY"
    },
    {
      libelle: "Wave",
      code: "WAVE"
    },
    {
      libelle: "Free Money",
      code: "FREE_MONEY"
    },
    {
      libelle: "Carte Bancaire",
      code: "CARTE_BANCAIRE"
    },
    {
      libelle: "Cash / TouchPoint",
      code: "CASH_TOUCHPOINT"
    },
    {
      libelle: "Cash",
      code: "CASH"
    },

  ];

  /*  @ViewChild("facturetoprint") facturetoprintRef: any; // printable content.
    @ViewChild("iframe") iframe: any; // target host to render the printable content
     private portalHost!: PortalOutlet;*/


  currentTransaction!: TransactionInterface;
  patientPersonne!: PersonneInterface;
  prestation!: PrestationInterface;

  constructor(private api: TransactionService,
              private route: ActivatedRoute,
              private router: Router,
              public utils: UtilsService,
              private profilService: ProfilService
              // private componentFactoryResolver: ComponentFactoryResolver,
              // private injector: Injector,
              // private appRef: ApplicationRef,
              // private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const transID = +id;
      // Faire une requête API pour obtenir les détails de la transaction
      // getTransactionById(id).then(...)
      this.getTransaction(transID).subscribe({
        next: value => {
          this.currentTransaction = value;
          this.prestation = this.currentTransaction.prestation
          this.patientPersonne = this.prestation.dossierMedical?.patient?.personne!;
        }
      })
    } else {
      // Rediriger vers la page des transactions
      this.router.navigate(['/transactions']);
    }
  }

  getTransaction(id: number) {
    return this.api.getTransactionByID(id);
  }

  getTransactionInfo(): { color: string; text: string, bgColor: string } {
    let bgColor = 'rgba(172,173,176,0.25)'
    let color = '#5D6273';
    let text = 'initié';
    const status = this.currentTransaction.transactionStatus

    switch (status) {
      case TransactionStatus.INITIATED:
        color = '#5D6273';
        bgColor = 'rgba(172,173,176,0.2)';
        text = 'initié';
        break;
      case TransactionStatus.SUCCESS:
        color = '#20AC2E';
        bgColor = 'rgba(32,172,46,0.2)';
        text = 'réglée';
        break;
      case TransactionStatus.FAILED:
        color = '#A81735';
        bgColor = 'rgba(168,23,53,0.2)';
        text = 'échec';
        break;

      case TransactionStatus.PENDING:
        color = '#4c4efd';
        bgColor = 'rgba(76,78,253,0.2)';
        text = 'en cours';
        break;
    }

    return {color, text, bgColor};
  }

  isSuccess() {
    return this.currentTransaction.transactionStatus === TransactionStatus.SUCCESS;
  }

  isPayedOnCash() {
    return this.currentTransaction.moyenPayment === MoyenPayment.ESPECE;
  }

  getTextDesc() {
    return this.isSuccess() ? ('Payé ' + (this.isPayedOnCash() ? 'en' : 'via')) : 'Moyen de paiement';
  }

  getLibelleByCode() {
    return this.listMoyenPayment
      .find(m => m.code === this.currentTransaction.moyenPayment)?.libelle;
  }

  generatePDFAndDownload() {
    let data = document.getElementById('element-a-imprimer')!;  // id of the div you want to print
    html2canvas(data).then(canvas => {
      let imgWidth = 208;
      let pageHeight = 295;
      let heightLeft = canvas.height * imgWidth / canvas.width;

      // Calculer la largeur de la marge
      let marginLeft = 6; // Convertir 2rem en millimètres (25.4 mm par pouce)

      // Réduire la largeur de l'image pour prendre en compte la marge
      let adjustedImgWidth = imgWidth - marginLeft;

      // Calculer la hauteur de l'image ajustée
      let adjustedImgHeight = canvas.height * adjustedImgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 20;

      // Ajouter l'image avec la marge à gauche
      pdf.addImage(contentDataURL, 'PNG', marginLeft, position, adjustedImgWidth - marginLeft, adjustedImgHeight)

      pdf.save(this.getFactureName());  // Generated PDF
    });
  }

  getFactureName() {
    return `Facture - ${this.currentTransaction.token}`
  }

  /*
    printFacture() {
      window.print();
      /!*let printContents, popupWin;
      let element = document.getElementById('element-a-imprimer') as HTMLImageElement;
      // element.src = window.location.href + element.src;
      console.log('Element ', element);
      console.log('Element SRC ', element.src);
      printContents = element.outerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      if (popupWin){
        popupWin.document.open();
        popupWin.document.write(`
        <html lang="fr">
          <head>
            <title>Print Facture Touchmed</title>
            <style>
            // insérez ici les styles que vous voulez appliquer à votre impression
            </style>
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
        </html>`
        );
        popupWin.document.close();
      }*!/
    }
  */

  // generatePDFAndOpenInNewWindow() {
  //   let data = document.getElementById('element-a-imprimer')!;  // id of the div you want to print
  //   html2canvas(data).then(canvas => {
  //     let imgWidth = 208;
  //     let pageHeight = 295;
  //     let imgHeight = canvas.height * imgWidth / canvas.width;
  //     let heightLeft = imgHeight;
  //
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  //     let position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //
  //     // Convert the PDF to a data URL and open it in a new window
  //     const dataUrl = pdf.output('dataurlnewwindow');
  //     // @ts-ignore
  //     window.open(dataUrl);
  //   });
  // }

  /*private waitForImageToLoad(iframe: HTMLIFrameElement, done: Function): void {
    const interval = setInterval(() => {
      const allImages = iframe.contentDocument!.body.querySelectorAll("img.logoTouch");
      const loaded = Array.from({ length: allImages.length })!.fill(false) as boolean [];

      allImages.forEach((img, key) => {
        img = img as HTMLImageElement;
        loaded[key] = img.clientHeight !== 0;
      });

      if (loaded.every(c => c)) {
        clearInterval(interval);
        done();
      }
    }, 500);
  }

  private _attachStyles(targetWindow: Window): void {
    // Copy styles from parent window
    document.querySelectorAll("style").forEach(htmlElement => {
      targetWindow.document.head.appendChild(htmlElement.cloneNode(true));
    });
    // Copy stylesheet link from parent window
    const styleSheetElement = this._getStyleSheetElement();
    targetWindow.document.head.appendChild(styleSheetElement);
  }

  private _getStyleSheetElement() {
    const styleSheetElement = document.createElement("link");
    document.querySelectorAll("link").forEach(htmlElement => {
      if (htmlElement.rel === "stylesheet") {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = "stylesheet";
        styleSheetElement.type = "text/css";
        styleSheetElement.href = absoluteUrl;
      }
    });
    console.log(styleSheetElement.sheet);
    return styleSheetElement;
  }

  printMainContent(): void {
    const iframe = this.iframe.nativeElement;
    this.portalHost = new DomPortalOutlet(
      iframe.contentDocument.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    const portal = new TemplatePortal(
      this.facturetoprintRef,
      this.viewContainerRef,
      // {
      //   heros: this.heros
      // }
    );

    // Attach portal to host
    this.portalHost.attach(portal);
    this._attachStyles(iframe.contentWindow);
    iframe.contentWindow.onafterprint = () => {
      iframe.contentDocument.body.innerHTML = "";
    };

    this.waitForImageToLoad(
      iframe,
      () => iframe.contentWindow.print()
    );
  }

  ngOnDestroy(): void {
    this.portalHost.detach();
  }*/
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
