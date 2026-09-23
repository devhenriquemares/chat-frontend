import { Component, inject, OnInit, signal } from '@angular/core';
import { Input } from '../../components/input/input';
import { interval, min, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'email-validation',
  imports: [Input],
  templateUrl: './email-validation.html',
  styleUrl: './email-validation.css',
})
export class EmailValidation implements OnInit {
    private subscription!: Subscription
    private route = inject(ActivatedRoute)
    minutes = signal(5)
    firstSecondsDigit = signal(0)
    secondSecondsDigit = signal(0)

    ngOnInit(): void {
        this.initClock()
        const redirected = Boolean(this.route.snapshot.queryParams['redirected']) || false
        if (redirected) this.resendEmailCode()
    }

    resendEmailCode() {
        console.log('enviar email')
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
}
