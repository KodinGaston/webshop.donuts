# 🍩 Webshop Donut

An interactive and visually appealing shopping cart project focused on donut selection and purchase. Features include dynamic rendering, discounts based on time, responsive payment validation, and enhanced accessibility with ARIA attributes.

-------------------

## 📋 **Features**

### 🛍️ **Donut Catalog**

- Interactive display with:
  - High-quality images.
  - Pictures optimized (webp)
  - Star ratings.
  - Quantity buttons for precise selection.

### 🏷️ **Dynamic Discounts**

- **10% Discount:**
  - Automatically applied on:
    - **Friday afternoons**.
    - **Monday mornings**.
- **Free Shipping:**
  - Applies for orders **over 80 kr**.
  - Custom Swedish message: *"Gratis frakt vid köp över 80 kr."*

### 🛒 **Dynamic Shopping Cart**

- Displays selected items and calculates totals.
- Updates in real time with:
  - Discounts applied automatically.
  - Notifications for free shipping.

### 💳 **Payment Validation**

- Ensures accurate user input for:
  - Invoice with Swedish ID & /or: 
  - Card number.
  - Expiration date (month and year).
- Activates **"Order" button** only when validation succeeds.
- Confirmation message displayed upon successful purchase.
- **ARIA Accessibility:** Elements include `aria-label`, `aria-disabled`, `aria-live`, and `aria-labelledby` for better screen reader support.

### 📱 **Responsive Design**

- SCSS optimized for all devices, powered by modular SCSS files.

---------------------------

## 📂 **Project Structure**

📂 webshop-donut
├── 📂 node_modules              # Project dependencies
├── 📂 public
│   ├── 📂 images                # Donut images
│   ├── 📂 screenshots           # Responsiveness screenshots
│   ├── 📜 vite.svg              # Vite logo
│            
├── 📂 src
│   ├── 📂 js                      # JavaScript files
│   │   ├── 📜 donuts.mjs          # Donut logic
│   │   ├── 📜 main.mjs            # Main JavaScript entry
│   │   └── 📜 payment.mjs         # Payment validation logic
│   └── 📂 scss                      # SCSS files
│       ├── 📜 style.scss            # Global styles
│       ├── 📜 _donuts.scss          # Donut-specific styles
│       ├── 📜 _media-queries.scss   # Media queries for responsiveness
│       ├── 📜 _payment.scss         # Payment section styles
│       └── 📜 payment.mjs           # message section styles
├── 📜 .gitignore                  # Git ignore file
├── 📜 package.json                # Project dependencies and scripts
├── 📜 pnpm-lock.yaml              # Dependency lock file
└── 📜 README.md                   # Project documentation
└── 📜 index.html                  # Main HTML file    

--------------------------------------------------------------------------


🧠 Pseudocode

🔧 A. Initialization and Configuration

    ► Objective: Prepare the project for execution.

 1. Import required dependencies and modules.
 2. Define essential variables for:

  • HTML Containers:

        donutContainer (Displays donut cards).
        cartHtmlContainer (Displays shopping cart).

  • Date and Time Management:

        • today (current date).

        • isFriday, isMonday (boolean values to check specific days).

        • currentHour (used to determine discount periods).

   -- -- -- -- -- -- --

📊 B. Utility Functions

• getPriceMultiplier():

    • Function: Determines applicable discounts.
    Logic:

    • If the time is Friday after 15:00 or Monday before 15:00, return 0.90 (10% discount).

    • Otherwise, return 1.00 (no discount).

• Error Handling:

    • If a discount cannot be applied correctly, display: "An error occurred while calculating the discount. Please try again."

--- --- --- --- --- --- 

🍩 C. Rendering Donuts

• renderDonuts():

    • Function: Dynamically generates and displays donut cards.

    • Logic:

  •Each card includes:
  
    • Image carousel with two images per donut.

    • Star ratings based on customer feedback.

    • Price and "+" / "-" buttons for quantity adjustment.

  • Error Handling:

    • If images fail to load, show: "Image not available."

    • Ensure proper ARIA attributes for accessibility on the carousel and buttons.

    --- --- --- ---

🎠 D. Image Carousel

  • attachCarouselEvents():

    • Function: Enables navigation between images.

    • Logic:

      • Clicking the arrow toggles between the two images for each donut.

    • Error Handling:

      • If navigation fails, display: "Image carousel functionality unavailable."

 • Accessibility:

    • Add ARIA labels for navigation buttons: "Previous image", "Next image".

--- --- --- --- ---

⭐ E. Star Ratings

• generateStars(rating):

    • Function: Converts numeric ratings into visual icons.
    • Logic:

            Full star (★), half star (½), and empty star (☆).

  • Error Handling:

    • If a rating cannot be processed, display: "Rating unavailable."

--- --- --- --- --- --- ---

➕ F. Quantity Adjustment

• attachAmountEvents():

    • Function: Handles user input for adjusting donut quantities.

    • Logic:

            "+" button increases quantity.

             "-" button decreases quantity (minimum of 0).

• Error Handling:

             • Prevent negative values.

              • If buttons fail to respond, display: "Quantity adjustment unavailable."

--- --- --- --- ---

🛒 G. Shopping Cart

• printCartDonuts():

• Function: Updates the cart dynamically based on user selections.

• Logic:

  • Displays each selected donut with:

    • Name, quantity, and total price per donut.

• Calculates and shows:

    • Total price for all donuts.

    • Shipping cost (40 kr).

    • Free shipping message for orders exceeding 80 kr: "Gratis frakt vid köp över 80 kr!"

• Error Handling:

    • If the cart fails to update, display: "Unable to update cart. Please try again."

--- --- --- --- ---

💳 H. Payment Logic

• handlePayment():

    • Function: Validates user input and handles payment functionality.

    • Logic:

      • Two payment options:

         • Card Payment: Requires valid card number, expiration month, and year.

         • Invoice (Faktura): Requires valid Swedish ID.

      • Activates "Order" button (beställ) only after successful validation.

      • Displays a success message upon order confirmation:

         • "Tack! Vi kommer att behandla din beställning." (Visible for ~5 seconds).

• Error Handling:

  • For invalid inputs, display appropriate error messages:

    • "Please enter a valid card number."

    • "Expiration date is invalid."

  • Prevents "Order" button activation until all inputs are valid.

--- --- --- --- --- --- ---- 

🎉 I. Discount Notifications

• Functionality:

  • Every 15 minutes, a pop-up message appears: "🎉 Du får 10% rabatt! Gäller på fredagar efter kl. 15:00 och måndagar innan kl. 15:00."

  • Applies discount only to donut prices (not shipping).

Error Handling:

  • If the message fails to display, log: "Unable to display discount notification."
--- --- --- -- --- --

🌟 Expected User Flow

1. Homepage:

 • Header displays the company name "Webshop Donuts" and a selection of donuts.

2. Donut Selection:

 • Users can scroll through 6 carousels (2 images per donut).
 • Ratings (stars) and prices are displayed for each donut.
 • Quantity buttons (+ and -) allow users to select their desired quantity.

3. Shopping Cart:

 • Displays selected donuts, quantity, and price per category.
 • Shows total price and shipping cost.
 • Highlights free shipping if the total exceeds 80 kr.

4. Payment:

 • Users select a payment method (card or invoice).
 • Validation ensures correct data entry.
 • Confirmation message displayed upon successful order.


----------------------------------------------

🖼️ Screenshots

Add screenshots showcasing the functionality and responsiveness of your project across devices.

♦ Mobile responsivity
♦ Tablet responsivity
♦ PC/Laptop "

-----------------------

⚙️ Technologies Used

HTML5: Semantic and structured content.
JavaScript (ES6+): Dynamic and interactive functionality.
SCSS: Modular and reusable CSS with responsive design.
Vite: Lightning-fast development environment.
Pnpm & nodes.

--------------------------

🛠️ Contribution Guidelines
Fork this repository.

Create a new branch:
bash
git checkout -b feature/new-feature
Commit your changes:
bash
git commit -m "Add new feature"
Push to your branch:
bash
git push origin feature/new-feature
Open a pull request for review.

----------------------------------------

📧 Contact

If you have any questions or encounter issues, feel free to open an issue on this repository or reach out to me directly.

contact@kodingaston.com

------------------------

⭐ Show Your Support ☻

If you like this project, please consider giving it a ⭐ on GitHub! ☺ 