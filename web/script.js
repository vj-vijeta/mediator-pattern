<script>
    class Mediator {
            constructor() {
                this.retailers = [];
                this.vendors = {};
            }

            addRetailer(retailer) {
                this.retailers.push(retailer);
            }

            addVendor(product, vendor) {
                this.vendors[product] = vendor;
            }

            placeOrder(product, order) {
                const vendor = this.vendors[product];
                if (vendor) {
                    vendor.processOrder(order);
                } else {
                    console.log(`Vendor for ${product} not found.`);
                }
            }

            updateOrderStatus(orderStatus) {
                this.retailers.forEach(retailer => {
                    retailer.updateOrderStatus(orderStatus);
                });
            }
        }

        class Retailer {
            constructor(id, mediator) {
                this.id = id;
                this.mediator = mediator;
                this.mediator.addRetailer(this);
                this.orderButton = document.querySelector(`#retailer${id} .orderButton`);
                this.orderStatus = document.querySelector(`#retailer${id} .orderStatus`);
                this.orderButton.addEventListener('click', this.placeOrder.bind(this));
            }

            placeOrder() {
                const products = ['Rice', 'Wheat', 'Spices', 'Millets'];
                const product = products[Math.floor(Math.random() * products.length)];
                const order = Math.floor(Math.random() * 1000);
                this.mediator.placeOrder(product, order);
            }

            updateOrderStatus(orderStatus) {
                if (this.id === orderStatus.retailerId) {
                    this.orderStatus.innerText = `Order ${orderStatus.order} - ${orderStatus.status}`;
                }
            }
        }

        class BaseVendor {
            constructor(product, mediator) {
                this.product = product;
                this.orders = [];
                this.mediator = mediator;
                this.mediator.addVendor(product, this);
            }

            processOrder(order) {
                this.orders.push(order);
                const orderStatus = { order, status: 'processed', retailerId: Math.ceil(Math.random() * 2) };
                this.mediator.updateOrderStatus(orderStatus);
                this.displayOrders();
            }

            displayOrders() {
                const vendorOrders = document.querySelector(`#${this.product.toLowerCase()}Vendor .vendorOrders`);
                if (vendorOrders) {
                    vendorOrders.innerHTML = '';
                    this.orders.forEach(order => {
                        const orderElement = document.createElement('div');
                        orderElement.innerText = `Order: ${order}`;
                        vendorOrders.appendChild(orderElement);
                    });
                }
            }
        }


        const mediator = new Mediator();

        const retailer1 = new Retailer(1, mediator);
        const retailer2 = new Retailer(2, mediator);

        const riceVendor = new BaseVendor('Rice', mediator);
        const wheatVendor = new BaseVendor('Wheat', mediator);
        const spicesVendor = new BaseVendor('Spices', mediator);
        const milletsVendor = new BaseVendor('Millets', mediator);

        // Display mediator's orders
        const mediatorOrders = document.querySelector('#mediator .mediatorOrders');
        mediatorOrders.innerHTML = 'retailers';

        mediator.retailers.forEach((retailer, index) => {
            const orderElement = document.createElement('div');
            orderElement.innerText = `Retailer ${index + 1} Order`;
            mediatorOrders.appendChild(orderElement);
        });
    </script>
