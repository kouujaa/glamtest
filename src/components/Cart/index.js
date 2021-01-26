import React, { PureComponent } from 'react'
import './style.scss'
import Cookies from 'js-cookie'
import StripeCheckout from 'react-stripe-checkout'
import { Spin, message } from 'antd'
import _ from 'lodash'
import SalonImage from './salonImage'

class CartComponent extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            fullPageLoading: false,
            cart: false,
            cartItems: [],
            cartlen: '',
            totalPrice: 0
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0)
        this.setState({ fullPageLoading: true })
        const cartData = Cookies.get('cartData')
        if(cartData !== undefined){
            this.setState({ fullPageLoading: false })
            JSON.parse(cartData).service.map(ci => {
                this.state.totalPrice += parseInt(ci.price)
                this.setState({totalPrice: this.state.totalPrice})
            })
            const servicesToRender = JSON.parse(cartData).service.filter(service => service)
            const numService = servicesToRender.length
            this.setState({cartlen: numService})
            this.setState({
                cartItems: JSON.parse(cartData),
                cart: true
            })
        }else{
            this.setState({
                fullPageLoading: false,
                cartItems: '',
                cart: false,
                cartlen: 0,
                totalPrice: 0
            })
        }
    }

    removeService = async(id) => {
        // const cartData = Cookies.get('cartData') 
        // if(cartData !== undefined){
        //     const servicesToRender = JSON.parse(cartData).service.filter(service => service)
        //     const numService = servicesToRender.length
        //     if(numService > 1) {
        //         var servicearray = JSON.parse(cartData).service.filter(function(s) { return s.id != id });
        //         var finalService = JSON.parse(cartData).service = servicearray
        //         this.setState({cartItems: finalService, fullPageLoading: false  });
        //     }else if(numService == 1){
        //         Cookies.remove('cartData')
        //         this.setState({ fullPageLoading: false })
        //     }
        //     this.componentDidMount()
        // }

        this.setState({ fullPageLoading: true })
        if(this.state.cartItems.service.length > 1){
            this.state.cartItems.service.map(ci => {
                this.state.totalPrice -= parseInt(ci.price)
                this.setState({totalPrice: this.state.totalPrice})
            })
            const items = this.state.cartItems.service.filter(item => item.id !== id)
            this.state.cartItems.service = items
            this.setState({fullPageLoading: false  })
            Cookies.set('cartData', this.state.cartItems)
        }else if(this.state.cartItems.service.length === 1){
            Cookies.remove('cartData')
            this.setState({ fullPageLoading: false, totalPrice: 0 })
        }
        window.location.reload();
        this.componentDidMount()
    }

    checkoutPayment = async(token) => {
        this.setState({ fullPageLoading: true })
        const userToken = Cookies.get('authToken')
        if(userToken){
            const data = {
                token: token,
                bookingDate: this.state.cartItems.bookingDate,
                bookingName: this.state.cartItems.bookingName,
                bookingMobile: this.state.cartItems.bookingMobile,
                bookingEmail: this.state.cartItems.bookingEmail,
                salonId: this.state.cartItems.salonId,
                salon_user: this.state.cartItems.salon_user,
                salonName: this.state.cartItems.salonName,
                service: this.state.cartItems.service,
                totalPrice: this.state.totalPrice,
                userToken: this.state.cartItems.userToken,
            }
            const result = await this.props.addservicebooking(data)
            if(result.value.status===true){
                Cookies.remove('cartData')
                message.success(result.value.message)
                this.setState({ fullPageLoading: false })
                window.location.reload();
              }else{
                message.error(result.value.message)
              }
        }
    }

    render(){
        const {cartItems, cart, cartlen, totalPrice} = this.state
        console.log(cartItems)
        return(
            <div>
                <Spin spinning={this.state.fullPageLoading}>
                <div className="cart_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section__title">
                                    <h2>Shopping Bag</h2>
                                </div>
                            </div>
                            <div className="content__cart">
                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <div className="shop-banner__box">
                                            <img src="images/cart_banner.jpg" />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className={cart ? 'col-md-8' : 'col-md-12'}>
                                        <div className="cart-list ship_lft boxs cart_lft">
                                            <h3>My Cart({cartlen})</h3>
                                            {
                                                cart ? 
                                                <>
                                                {
                                                    cartItems.service.map((service) => (
                                                        <div className="cartlist boxs">
                                                        <div className="cart_items boxs">
                                                            <div className="item_img">
                                                                {/* <img src="images/User_male.png" alt="product image" /> */}
                                                                <SalonImage salonId={cartItems.salonId}/>
                                                            </div>
                                                            <div className="item_details">
                                                                <div className="id_lft boxs">
                                                                    <h5>
                                                                        {service.name}
                                                                        <span>{cartItems.salonName}</span>
                                                                    </h5>
                                                                    <p>${service.price}</p>
                                                                </div>
                                                                <div className="id_ryt boxs">
                                                                    <div className="quantity">
                                                                        {/* <div className="vaulebox">
                                                                            <button type="button" className="sub_btn">-</button>
                                                                            <input type="text" className="qty" value="1" />
                                                                            <button type="button" className="add_btn">+</button>
                                                                        </div> */}
                                                                        <button type='button' onClick={this.removeService.bind(this, service.id)} className="removeitem removeCart">Remove</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                                </>
                                                : <div className="cartlist boxs">
                                                    <div className="cart_items boxs text-center">
                                                        <h2>Your cart is empty! </h2>
                                                        <img src='images/cart.png' height="250" width="300px" alt="Empty Cart" />
                                                    </div>
                                                    <div className="cart_items boxs text-center"><br />
                                                        <a href="/salons" className="btn btn-primary" style={{border: 'none', background: '#bb9b62'}}>Go Shopping</a>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {
                                            cart ? 
                                                <div className="cart-checkout-list ship_ryt boxs mgbtm0">
                                                    <form method="post">
                                                        <div className="couponbox coupon_box boxs res_coupon767">
                                                            {/* <h5>Coupons</h5> */}
                                                            <div className="apply_coupons boxs">
                                                                <input type="text" name="coupon_code" id="coupon" className="form-control" value="" placeholder="Discount code" />
                                                                <a href="#" id="apply-coupon">APPLY NOW</a>
                                                            </div>
                                                        </div>
                                                        <div className="your_order your2_order2 boxs res_coupon767">
                                                            <h5>Your Order</h5>
                                                            <div className="bd_btm"></div>
                                                            <h4>
                                                                Total({cartlen} <input type="hidden" name="total_items" id="total_items" value={cartlen} /> items)
                                                                <p style={{display:'inline', float:'right', margin: 0}}>${totalPrice}</p>
                                                                <input type="hidden" name="subtotal" value={totalPrice} />
                                                            </h4>
                                                            <div className="continuebtn checkoutbtn boxs">
                                                            <StripeCheckout 
                                                                stripeKey={process.env.REACT_APP_STRIPE_KEY} 
                                                                token={this.checkoutPayment} 
                                                                amount={cartItems.totalPrice*100}
                                                                currency='$'
                                                                >
                                                                    <button type="button" className="slidehover" name="checkout_continue">Checkout</button>
                                                                </StripeCheckout>
                                                                {/* <button type="button" className="slidehover" onClick={this.checkoutPayment} name="checkout_continue">Checkout</button> */}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            : 
                                            <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Spin>
            </div>
        )
    }
}

export default CartComponent