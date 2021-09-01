import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recurso } from 'src/app/models/recurso.interface';
import { RecursoService } from 'src/app/services/recurso/recurso.service';
import { RecursoDataService } from '../../recurso-data.service';

interface Option {
  label: string,
  value: any
}

@Component({
  selector: 'app-novo-recurso-modal',
  templateUrl: './novo-recurso-modal.component.html',
  styleUrls: ['./novo-recurso-modal.component.scss']
})
export class NovoRecursoModalComponent implements OnInit {

  readonly recursoForm = this.formBuilder.group({
    nome: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    tipoMedida: ['', Validators.required],
    tipoRecurso: ['', Validators.required],
    ativo: ['', Validators.required]
  });

  tiposRecursos: Option[] = [
    { label: "Insumo", value: "INSUMO" },
    { label: "Auxílio", value: "AUXILIO" },
  ];

  status: Option[] = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Recurso,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NovoRecursoModalComponent>,
    private recursoService: RecursoService,
    private recursoDataService: RecursoDataService,
    
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.recursoForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.recursoForm.valid) {
      const formValue = this.recursoForm.getRawValue();
      const recurso: Recurso = {
        id: this.data ? this.data.id : undefined,
        nome: formValue.nome,
        preco: Number(formValue.preco),
        tipoMedida: formValue.tipoMedida,
        tipoRecurso: formValue.tipoRecurso,
        ativo: formValue.ativo
      };

      this.recursoService.saveOrUpdate(recurso)
        .subscribe(res => {
          this.recursoDataService.atualizaListaRecursos();
          this.closeDialog();
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get recursoFormControls(): { [key: string]: AbstractControl } {
    return this.recursoForm.controls;
  }

}
