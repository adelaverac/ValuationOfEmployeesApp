import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Slide } from 'src/app/interfaces/slide/slide';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: [
        './styles/welcome.scss',
        './styles/welcome.shell.scss',
        './styles/welcome.responsive.scss',
    ],
})
export class WelcomePage implements OnInit {

    slides = [] as Slide[];

    slideOptions = {
        autoplay: true,
        speed: 800,
        on: {
            beforeInit() {
                const swiper = this;
                swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
                const overwriteParams = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: true,
                };
                swiper.params = Object.assign(swiper.params, overwriteParams);
                swiper.params = Object.assign(swiper.originalParams, overwriteParams);
            },
            setTranslate() {
                const swiper = this;
                const { slides } = swiper;
                for (let i = 0; i < slides.length; i += 1) {
                    const $slideEl = swiper.slides.eq(i);
                    const offset$$1 = $slideEl[0].swiperSlideOffset;
                    let tx = -offset$$1;
                    if (!swiper.params.virtualTranslate) {
                        tx -= swiper.translate;
                    }
                    let ty = 0;
                    if (!swiper.isHorizontal()) {
                        ty = tx;
                        tx = 0;
                    }
                    const slideOpacity = swiper.params.fadeEffect.crossFade
                        ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
                        : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                    $slideEl
                        .css({
                            opacity: slideOpacity,
                        })
                        .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
                }
            },
            setTransition(duration) {
                const swiper = this;
                const { slides, $wrapperEl } = swiper;
                slides.transition(duration);
                if (swiper.params.virtualTranslate && duration !== 0) {
                    let eventTriggered = false;
                    slides.transitionEnd(() => {
                        if (eventTriggered) {
                            return;
                        }
                        if (!swiper || swiper.destroyed) {
                            return;
                        }
                        eventTriggered = true;
                        swiper.animating = false;
                        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                        // tslint:disable-next-line: prefer-for-of
                        for (let i = 0; i < triggerEvents.length; i += 1) {
                            $wrapperEl.trigger(triggerEvents[i]);
                        }
                    });
                }
            },
        }
    };

    constructor(
        private navController: NavController
    ) { }

    ngOnInit() {
        this.loadTheInformationWelcome();
    }

    loginWithEmail(): void {
        this.navController.navigateRoot('/login', { animated: true });
    }

    private loadTheInformationWelcome(): void {
        this.slides = [
            {
                imagePath: './assets/svg/community/app04.svg',
                title: 'Bienvenido a Guudjob',
                description: 'Aplicación movil de experiencia de empleado para impactar en la productividad y motivación'
            },
            {
                imagePath: './assets/svg/community/app02.svg',
                title: 'Bienvenido a Guudjob parte 2',
                description: 'Aplicación movil de experiencia de empleado para impactar en la productividad y motivación parte 2'
            },
            {
                imagePath: './assets/svg/community/app03.svg',
                title: 'Bienvenido a Guudjob parte 3',
                description: 'Aplicación movil de experiencia de empleado para impactar en la productividad y motivación parte 3'
            },
            {
                imagePath: './assets/svg/community/app01.svg',
                title: 'Bienvenido a Guudjob parte 1',
                description: 'Aplicación movil de experiencia de empleado para impactar en la productividad y motivación parte 1'
            }
        ];
    }

}
