import { NextRequest, NextResponse } from 'next/server';
import { stripe, createCheckoutSession, getStripeCustomerByEmail, createStripeCustomer } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let customerId = user.stripe_customer_id;

    if (!customerId) {
      let customer = await getStripeCustomerByEmail(user.email);

      if (!customer) {
        customer = await createStripeCustomer(user.email, user.full_name);
      }

      customerId = customer.id;

      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!;
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

    const session = await createCheckoutSession(customerId, priceId, returnUrl);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
