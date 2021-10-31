<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Gmail extends Mailable
{
    use Queueable, SerializesModels;
    public $detail;
    public $subject;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($subject, $detail) {
        $this->detail = $detail;
        $this->subject = $subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build() {
        return $this->subject($this->subject)
            ->view('emails.layout')
            ->from(config('mail.from.address'));
    }
}
