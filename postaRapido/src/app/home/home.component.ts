import { Component, OnDestroy, OnInit } from '@angular/core';

interface HomeStep {
  icon: string;
  title: string;
  description: string;
}

interface HomeBenefit {
  icon: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

interface QuickAction {
  icon: string;
  title: string;
  description: string;
  route: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  readonly steps: HomeStep[] = [
    { icon: 'fa-file-alt', title: 'Cadastre seu pedido', description: 'Preencha as informações de envio de forma simples.' },
    { icon: 'fa-shopping-bag', title: 'Escolha o tipo de entrega', description: 'Expressa, agendada ou econômica.' },
    { icon: 'fa-credit-card', title: 'Pagamento seguro', description: 'Finalize com rapidez e total segurança.' },
    { icon: 'fa-box', title: 'Receba sua encomenda', description: 'Rastreie até a entrega no endereço desejado.' }
  ];

  readonly benefits: HomeBenefit[] = [
    { icon: 'fa-bolt', title: 'Entrega rápida', description: 'Agilidade e precisão em cada envio.' },
    { icon: 'fa-map-marker-alt', title: 'Rastreamento em tempo real', description: 'Acompanhe cada etapa do percurso.' },
    { icon: 'fa-lock', title: 'Segurança e garantia', description: 'Sua encomenda chega intacta e protegida.' },
    { icon: 'fa-headset', title: 'Atendimento dedicado', description: 'Suporte quando você precisar.' }
  ];

  readonly quickActions: QuickAction[] = [
    {
      icon: 'fa-users',
      title: 'Clientes',
      description: 'Gerencie cadastros e histórico.',
      route: '/clientes/clientes-list',
      label: 'Ver clientes'
    },
    {
      icon: 'fa-clipboard-list',
      title: 'Pedidos',
      description: 'Crie e acompanhe entregas.',
      route: '/pedidos/pedidos-list',
      label: 'Ver pedidos'
    },
    {
      icon: 'fa-plus-circle',
      title: 'Novo pedido',
      description: 'Registre um envio agora.',
      route: '/pedidos/pedidos-form',
      label: 'Criar pedido'
    }
  ];

  readonly testimonials: Testimonial[] = [
    { quote: 'Serviço excelente! Entrega super rápida e segura.', author: 'João Silva' },
    { quote: 'O rastreamento em tempo real fez toda a diferença. Muito confiável.', author: 'Maria Oliveira' },
    { quote: 'Atendimento impecável. Estou muito satisfeito com a experiência.', author: 'Carlos Souza' }
  ];

  activeTestimonial = 0;
  private testimonialTimer: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.testimonialTimer = setInterval(() => this.nextTestimonial(), 6000);
  }

  ngOnDestroy(): void {
    if (this.testimonialTimer) {
      clearInterval(this.testimonialTimer);
    }
  }

  nextTestimonial(): void {
    this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.activeTestimonial =
      (this.activeTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.activeTestimonial = index;
  }
}
