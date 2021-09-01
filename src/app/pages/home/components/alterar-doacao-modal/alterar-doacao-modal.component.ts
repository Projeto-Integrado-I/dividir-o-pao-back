import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoacoesService } from 'src/app/services/doacoes.service';
import { NotifierService } from 'src/app/services/notifier/notifier.service';

@Component({
  selector: 'app-alterar-doacao-modal',
  templateUrl: './alterar-doacao-modal.component.html',
  styleUrls: ['./alterar-doacao-modal.component.scss'],
})
export class AlterarDoacaoModalComponent implements OnInit {
  private valor = 0;

  readonly alterarDoacaoForm = this.formBuilder.group({
    valor: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    calc: ['', [Validators.required]],
  });

  constructor(
    private dialogRef: MatDialogRef<AlterarDoacaoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { valorAtual: number },
    private formBuilder: FormBuilder,
    private service: DoacoesService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.alterarDoacaoForm.valid) {
      const toCalcValor: number = this.alterarDoacaoForm.value.valor - 0;
      const valorAtual: number = this.data.valorAtual;

      this.service
        .update(
          this.alterarDoacaoForm.value.calc === '+'
            ? valorAtual + toCalcValor
            : valorAtual - toCalcValor
        )
        .subscribe((resp) => {
          this.dialogRef.close(resp.content);
          this.notifierService.showNotification(resp.feedback);
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
