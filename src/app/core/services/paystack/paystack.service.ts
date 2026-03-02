import { Injectable } from '@angular/core';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PaystackService {
  private publicKey = 'pk_test_9307d3ea61c406bccbb12d20a81e53e1994e5776';
  // Set to true for development/testing without live Paystack
  private testMode = true;

  constructor() {}

  // Initiate Paystack payment
  initiatePayment(
    email: string,
    amount: number,
    reference: string,
    onSuccess: (response: any) => void,
    onClose: () => void,
  ) {
    // Validate inputs
    if (!email || !amount || !reference) {
      console.error('Missing required payment details:', {
        email,
        amount,
        reference,
      });
      onClose();
      return;
    }

    if (this.testMode) {
      // Simulate payment for testing
      console.log('Test mode: Simulating payment...');
      this.simulatePayment(email, amount, reference, onSuccess);
      return;
    }

    // Check if PaystackPop is available
    if (!window.PaystackPop) {
      console.error(
        'Paystack library not loaded. Make sure the script is included in index.html',
      );
      onClose();
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: this.publicKey,
        email: email,
        amount: amount * 100, // Convert to kobo
        ref: reference,
        onClose: () => {
          console.log('Payment window closed');
          onClose();
        },
        callback: (response: any) => {
          console.log('Payment successful:', response);
          onSuccess(response);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error initiating Paystack payment:', error);
      onClose();
    }
  }

  // Simulate payment response for testing
  private simulatePayment(
    email: string,
    amount: number,
    reference: string,
    onSuccess: (response: any) => void,
  ) {
    // Simulate a delay like a real payment
    setTimeout(() => {
      const mockResponse = {
        reference: reference,
        status: 'success',
        message: 'Approved',
        transaction: Math.floor(Math.random() * 1000000),
        amount: amount * 100,
        currency: 'NGN',
        email: email,
        customer: {
          id: Math.floor(Math.random() * 10000),
          email: email,
        },
      };
      console.log('Mock payment response:', mockResponse);
      onSuccess(mockResponse);
    }, 2000); // 2 second delay
  }
}
