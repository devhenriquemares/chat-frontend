import { Component, inject, OnInit, signal } from '@angular/core';
import { Input } from '../../components/input/input';
import { interval, min, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationCard } from '../../components/notification-card/notification-card';
import { ApiError } from '../../dtos/api/http.error';

@Component({
  selector: 'email-validation',
  imports: [Input, NotificationCard],
  templateUrl: './email-validation.html',
  styleUrl: './email-validation.css',
})
export class EmailValidation implements OnInit {
    private subscription!: Subscription
    private route = inject(ActivatedRoute)
    private authService = inject(AuthService)

    notificationCardMessage = signal('')
    uniqueCode = signal('')
    success = signal(true)
    
    minutes = signal(5)
    firstSecondsDigit = signal(0)
    secondSecondsDigit = signal(0)
    
    handleNotificationDismiss() {
        this.notificationCardMessage.set('')
    }

    ngOnInit(): void {
        this.initClock()
        const redirected = Boolean(this.route.snapshot.queryParams['redirected']) || false
        if (redirected) this.resendEmailCode()
    }

    async resendEmailCode() {
        const result = await this.authService.resendEmailCode()
        if (!result.success) {
            this.handleError(result.error!)
            return
        }

        this.success.set(result.success)

        this.notificationCardMessage.set('Código reeviado com sucesso!')
        this.resetClock()
        this.initClock()
    }

    async validateEmail() {
        const result = await this.authService.validateEmail(this.uniqueCode())
        this.success.set(result.success)

        if (!result.success) {
            return this.handleError(result.error!)
        }
        this.notificationCardMessage.set('Email verificado com sucesso!')
    }

    resetClock() {
        this.subscription.unsubscribe()
        this.minutes.set(5)
        this.firstSecondsDigit.set(0)
        this.secondSecondsDigit.set(0)
    }

    initClock() {
        this.subscription = interval(1000).subscribe(() => {
            if (this.minutes() == 0 && this.secondSecondsDigit() == 0 && this.firstSecondsDigit() == 0) {
                this.subscription.unsubscribe()
                return
            }

            if (this.secondSecondsDigit() == 0) {
                this.secondSecondsDigit.set(9)
                if (this.firstSecondsDigit() == 0) {
                    this.firstSecondsDigit.set(5)
                    this.minutes.update(current => (current - 1))
                    return
                }
                this.firstSecondsDigit.update(current => (current - 1))
                return
            }
            if (this.secondSecondsDigit() > 0) {
                this.secondSecondsDigit.update(current => (current - 1))
                return
            }
        })
    }

    private handleError(error: ApiError) {
        if (error.code === "INVALID_EMAIL_CODE") {
            this.notificationCardMessage.set(
                error.message == "Invalid email code: Expired code" ? 
                    'Código expirado'
                    : 'Código inválido'
            )
        } else if (error.errors.length > 0) {
            this.notificationCardMessage.set('Insira um código')
        } else {
            this.notificationCardMessage.set('Alguma coisa deu errado, tente novamente mais tarde')
        }
    }
}
