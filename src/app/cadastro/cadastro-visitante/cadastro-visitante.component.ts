import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-visitante',
  templateUrl: './cadastro-visitante.component.html',
  styleUrls: ['./cadastro-visitante.component.css']
})
export class CadastroVisitanteComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  cadastroForm!: FormGroup;
  fotoPreview: string | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  tiposVeiculo = [
    { value: 'CARRO', label: 'Carro' },
    { value: 'MOTO', label: 'Moto' },
    { value: 'CAMINHONETE', label: 'Caminhonete' },
    { value: 'CAMINHAO', label: 'Caminhão' },
    { value: 'VAN', label: 'Van' },
    { value: 'MICRO_ONIBUS', label: 'Micro-ônibus' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      veiculo: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      dataDoDia: ['', [Validators.required]],
      entrada: ['', [Validators.required]],
      saida: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      foto: [null]
    });
  }

  abrirCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.style.display = 'block';
      video.srcObject = stream;
    }).catch((error) => {
      console.error('Erro ao acessar a câmera: ', error);
    });
  }

  capturarFoto() {
    const canvas: HTMLCanvasElement = this.canvasElement.nativeElement;
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    canvas.style.display = 'block';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.fotoPreview = canvas.toDataURL('image/png');
      this.cadastroForm.patchValue({ foto: this.fotoPreview });
      // Parar o vídeo após capturar a foto
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.style.display = 'none';
    }
  }
}
