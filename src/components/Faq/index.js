import React, { PureComponent } from 'react'
import './styles.scss'
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default class FaqComponent extends PureComponent {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const FAQs = [
      {
        id: 1,
        question: 'What is your cancellation policy?',
        answer: 'At GlamPlug, we understand that things come up and you might need to cancel your appointment. If that happens, please keep in mind that each service provider has different cancellation policies. Please understand their cancellation policy before booking.'
      },
      {
        id: 2,
        question: 'What styles do you offer?',
        answer: `While we do offer many different hairstyle looks on our website, our clients are not limited to choosing from the styles shown in the styles dropbox. 

        Pro-tip: there’s no such thing as over-explaining what you want to your stylist! The more direction they have from you, the better chance you’ll be wowed by the results. We do ask that if you have a specific look in mind for your hair, makeup, nails, or lashes etc that you show your stylist a photo (or more than one) to give them a clear picture of your vision.
        `
      },
      {
        id: 3,
        question: 'I had a problem with my service, who do I contact?',
        answer: `We take customer satisfaction seriously and we are sorry to hear you had an issue with your service. Please email us at theglamplug01@gmail.com and we will get back to you within 24-48 hours.`
      }
    ]
    return (
      <div className="faq_wrap">
        <div className="container">
          <div className="row">
          <div className="col-md-12">
            {/* <h1>Hair Styles?</h1>
            <h2>Q -- What are box braids & what is a protective style?</h2>

            <p>A -- Box braids are a type of hair-braiding style that is predominantly popular throughout African, African-American, and African Diaspora. This type of hair style is best described as “boxy”, consisting of square-shaped hair divisions. A protective style is any hair configuration that keeps your ends safely tucked away. These hairdos require very little daily upkeep and help strands stay moisturized. On top of all that, the looks also promote hair growth since you're not pulling and yanking (causing shedding). I have created a hairstyles page with detailed information on each hairstyle & their many uses.</p>

            <h1>Payment?</h1>
            <h2>Q – What methods of payment do you accept?</h2>

            <p>A – We happily accept Debit, Cash, Visa and MasterCard</p>

            <h1>What about parking?</h1>
            <h2>Q – Where can I park?</h2>

            <p>A – Side streets almost always have parking spots available.</p>

            <h1>Can I find stylists to do weddings?</h1>
            <h2>Q – Do you style wedding hair?</h2>

            <p>A – Absolutely, book your consultation today!</p>

            <h1>What’s the process?</h1>
            <h2>Q- Will you take your time with my hair?</h2>

            <p>A- We certainly will. Have you heard of the slow food movement? We’re that for hair. We like to take our time to offer you the most relaxing and beautiful experience possible.</p>

            <h1>Can I cancel an appointment?</h1>
            <h2>Q- What is your cancellation policy?</h2>

            <p>A- We asked for at least 48 hours notice. We are often booked weeks in advance and would love to offer your cancelled appointment to another person if you can’t make it.</p> */}
          
          <Collapse accordion defaultActiveKey={['0']} className="faq_panel">
            {
              FAQs && FAQs.map((faq, i) => (
                <Panel header={faq.question} key={i}>
                  <p>{faq.answer}</p>
                </Panel>
              ))
            }
          </Collapse>
          
          </div>
          </div>
        </div>
      </div>
    )
  }
}
