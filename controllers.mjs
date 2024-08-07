import { processPayment } from './paymentGateway.mjs';
import axios from 'axios';

export const buySolana = async (req, res) => {
  const { amount, currency, paymentMethod } = req.body;

  try {
   
    const paymentResponse = await processPayment(amount, currency, paymentMethod);

    
    if (paymentResponse.status !== 'success') {
      return res.status(400).json({ error: 'Payment failed' });
    }

   
    const solanaAmount = await purchaseSolana(amount, currency);

    
    if (solanaAmount === null) {
      return res.status(500).json({ error: 'Failed to purchase Solana' });
    }

    
    res.status(200).json({ success: true, solanaAmount });
  } catch (error) {
    console.error('Error in buySolana:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

const purchaseSolana = async (amount, currency) => {
  try {
    
    const conversionRate = await getConversionRate(currency);
    if (conversionRate === null) {
      throw new Error('Failed to fetch conversion rate');
    }

    
    const solanaAmount = amount / conversionRate;


    return solanaAmount;
  } catch (error) {
    console.error('Error in purchaseSolana:', error);
    return null;
  }
};

const getConversionRate = async (currency) => {
  try {
   
    if (currency === 'INR') {
      return 100; 
    } else if (currency === 'USD') {
      return 1; 
    } else {
      throw new Error('Unsupported currency');
    }
  } catch (error) {
    console.error('Error in getConversionRate:', error);
    return null;
  }
};