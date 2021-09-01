import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

interface Link {
  name: string;
  href: string;
  icon?: string;
  action?: () => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  estaLogado = false;
  links: Link[] = [];

  constructor(private loginService: LoginService, private router: Router) {
    this.router.events.subscribe(() => {
      this.estaLogado = this.loginService.isLogado();
      this.loadLinks();
    });
  }

  private loadLinks(): void {
    this.links = [
      {
        name: 'Home',
        href: '/home',
      },
      {
        name: 'Solicitações',
        href: '/solicitacoes',
      },
      {
        name:  this.loginService.isCoordenador ? 'Voluntários' : 'Contatos',
        href: '/contatos',
      },
      {
        name: 'Sair',
        href: '/login',
        icon: 'exit_to_app',
        action: () => this.loginService.logout()
      },
    ];

    this.addLinksByFuncao();
  }

  private addLinksByFuncao(): void {
    if (this.loginService.isCoordenador) {
      this.links.splice(2, 0, ...[
        {
          name: 'Recursos',
          href: '/recursos',
        },
      ]);
    }
  }

  ngOnInit(): void {}
}
