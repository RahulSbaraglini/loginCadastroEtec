import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfValidator } from '../validators/cpf-validator';

import { Router } from '@angular/router';
import { ComparacaoValidator } from '../validators/comparacao-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' }
    ],
    nome: [
      { tipo: 'required', mensagem: 'O campo nome é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' },
      { tipo: 'minlength', mensagem: 'O número deve ter pelo menos 10 caracteres!' }
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo senha é obrigatório' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha!'},
    ],
    confirmarsenha: [
      { tipo: 'required', mensagem: 'O campo confirmar senha é obrigatório' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha!'},
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O cpf deve ter pelo menos 11 caracteres!' },
      { tipo: 'maxlength', mensagem: 'O cpf deve ter no máximo 14 caracteres!' },
      { tipo: 'invalido', mensagem: 'CPF inválido!' }
    ],
    data: [
      { tipo: 'required', mensagem: 'O campo data é obrigatório!' },
    ],
    celular: [
      { tipo: 'required', mensagem: 'O campo celular é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O número deve ter pelo menos 10 caracteres!' },
      { tipo: 'maxlength', mensagem: 'O número deve ter no máximo 11 caracteres!' }
    ],
    genero: [
      { tipo: 'required', mensagem: 'O campo genero é obrigatório!' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formRegistro = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],

      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      confirmarsenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido])],

      data: ['', Validators.compose([Validators.required])],

      celular: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(16)])],

      genero: ['', Validators.compose([Validators.required])]
    }, {
      validator: ComparacaoValidator('senha', 'confirmarsenha')
    });
  }

  ngOnInit() {
  }

  public registro() {
    if (this.formRegistro.valid) {
      console.log('Formulário válido!');
      this.router.navigateByUrl('/home');
    } else {
      console.log('Formulário inválido.')
    }
  }
}
