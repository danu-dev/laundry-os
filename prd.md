You are a senior product designer, UX architect, frontend engineer, software architect, and backend-aware engineer.

Your task is to design and build a production-quality web application called "LaundryOS".

LaundryOS is a modern, simple, automation-first laundry management system for small and medium-sized laundry businesses.

The application must be designed as a real product, not as a visual prototype.

The UI must be polished, modern, responsive, accessible, intuitive, and easy to use.

The codebase must be clean, modular, maintainable, scalable, strongly typed, and API-ready.

Do not create a messy prototype architecture.

Do not put everything into a few giant files.

Do not hardcode business logic inside UI components.

Do not create fake complexity just to make the application look sophisticated.

The primary goal is:

"Make running a laundry business require less administrative work."

==================================================

1. PRODUCT VISION
   \==================================================

LaundryOS helps a laundry owner manage:

- customers
- laundry orders
- services
- pricing
- payments
- order status
- customer tracking
- notifications
- reminders
- revenue
- reports
- inventory
- business settings
- automation

The core philosophy is:

"ONE INPUT → AUTOMATE THE REST"

The owner should enter only information that actually requires human input.

For example, the owner enters:

- customer
- service
- weight
- optional extras
- payment

The system automatically handles:

- order number
- price calculation
- estimated completion
- tracking link
- order timeline
- dashboard updates
- reminder scheduling
- notification preparation
- revenue calculations
- reports
- overdue detection
- unpaid detection
- pickup reminders

The system should feel like an assistant, not like an enterprise ERP.

================================================== 2. TARGET USER
==================================================

Primary user:

Small or medium-sized laundry business owner.

The owner may not be highly technical.

Therefore:

- avoid complicated terminology
- avoid unnecessary configuration
- avoid excessive dashboards
- avoid complex workflows
- use clear labels
- use simple language
- use obvious actions
- provide useful defaults
- minimize manual input
- provide helpful automation
- make important actions obvious

The owner should understand the interface without reading documentation.

================================================== 3. USER ROLES
==================================================

There is ONLY ONE authenticated role:

OWNER

There are no:

- staff accounts
- employee accounts
- manager accounts
- admin accounts
- cashier accounts

The owner has access to all business functionality.

The owner can:

- create orders
- edit orders
- update order status
- manage customers
- manage services
- manage payments
- manage inventory
- view reports
- configure automation
- configure business settings

================================================== 4. CUSTOMER ACCESS
==================================================

Customers DO NOT need an account.

Customers DO NOT log in.

Customers DO NOT have passwords.

Customers only receive a secure public tracking link.

Example:

/track/LD-260826-018/secure-token

The public tracking page allows the customer to:

- view order status
- view order number
- view basic order information
- view estimated completion
- view pickup status
- contact the laundry

Customers cannot:

- edit orders
- cancel orders
- change status
- access customer history
- access business information
- access financial dashboards
- access other orders

================================================== 5. CORE USER JOURNEY
==================================================

The main owner journey:

Landing Page
↓
Sign Up
↓
Business Setup
↓
Service Setup
↓
Dashboard
↓
Create Order
↓
Select Customer
↓
Select Service
↓
Enter Weight
↓
Optional Extras
↓
Payment
↓
Save Order
↓
System Automation
↓
Order Created
↓
Laundry Processing
↓
Owner Updates Status
↓
Ready for Pickup
↓
System Updates Tracking
↓
System Prepares Notification
↓
Customer Receives Notification
↓
Customer Picks Up Laundry
↓
Owner Marks Order Completed
↓
Revenue Automatically Updated
↓
Order Archived Into History

================================================== 6. CUSTOMER JOURNEY
==================================================

Customer journey:

Receive tracking link
↓
Open tracking page
↓
View order status
↓
Wait while laundry is processed
↓
Status changes to Ready for Pickup
↓
Receive notification if enabled
↓
Visit laundry
↓
Pay remaining balance if necessary
↓
Receive laundry
↓
Owner marks order Completed

No customer login is required at any point.

================================================== 7. PRODUCT NAVIGATION
==================================================

Keep the navigation extremely simple.

Desktop:

LaundryOS

- Home
- Orders
- Customers
- Reports

Secondary:

- Settings

Do NOT create top-level navigation items for:

- Finance
- Inventory
- Services
- Automation
- Notifications

These should be available through relevant screens or Settings.

The navigation should not overwhelm the owner.

================================================== 8. MOBILE NAVIGATION
==================================================

Mobile bottom navigation:

Home
Orders +
Customers
More

The "+" button must be the primary action.

The primary action is:

"Create Order"

The mobile UI must be designed intentionally.

Do not simply shrink the desktop layout.

================================================== 9. VISUAL DESIGN DIRECTION
==================================================

The design should feel like a premium modern SaaS application.

Visual characteristics:

- clean
- minimal
- professional
- friendly
- modern
- spacious
- highly readable
- strong typography
- solid colors
- subtle borders
- moderate corner radius
- minimal shadows
- clear hierarchy

Avoid:

- excessive gradients
- glassmorphism
- excessive rounded cards
- excessive shadows
- cartoon graphics
- decorative laundry illustrations
- unnecessary animations
- visual noise
- excessive charts
- enterprise-style clutter
- excessive colors

The product should feel trustworthy and practical.

================================================== 10. COLOR SYSTEM
==================================================

Use a solid color system.

Primary:

Primary 900: #1E1B4B
Primary 800: #312E81
Primary 700: #4338CA
Primary 600: #4F46E5
Primary 500: #6366F1
Primary 100: #E0E7FF
Primary 50: #EEF2FF

Neutral:

Neutral 950: #111827
Neutral 900: #1F2937
Neutral 700: #374151
Neutral 600: #4B5563
Neutral 500: #6B7280
Neutral 400: #9CA3AF
Neutral 300: #D1D5DB
Neutral 200: #E5E7EB
Neutral 100: #F3F4F6
Neutral 50: #F9FAFB
White: #FFFFFF

Semantic:

Success: #16A34A
Warning: #D97706
Danger: #DC2626
Info: #2563EB

Do not use color as the only status indicator.

Always combine:

- color
- icon
- text

================================================== 11. TYPOGRAPHY
==================================================

Primary font:

Plus Jakarta Sans

Fallback:

Inter

Typography:

Display:
32px / 40px / 700

H1:
28px / 36px / 700

H2:
22px / 30px / 700

H3:
18px / 26px / 600

Body:
14px / 22px / 400

Large:
16px / 24px / 400

Small:
13px / 20px / 400

Caption:
12px / 18px / 500

Use typography to create hierarchy.

Do not rely on excessive cards or colors to create hierarchy.

================================================== 12. SPACING SYSTEM
==================================================

Use a 4px spacing system:

4
8
12
16
20
24
32
40
48
64

Recommended:

Card padding:
20–24px

Section spacing:
24–32px

Form spacing:
16px

Button height:
44px

Input height:
44px

================================================== 13. COMPONENT DESIGN
==================================================

Buttons:

Primary:

- 44px height
- Primary 600
- white text
- 10px radius

Secondary:

- white background
- neutral border
- dark text

Danger:

- danger background
- white text

Cards:

- white
- 1px neutral border
- 14px radius
- minimal shadow

Inputs:

- 44px height
- 10px radius
- visible label
- clear focus state

Touch targets must be at least 44px.

================================================== 14. LANDING PAGE
==================================================

Hero:

"Laundry management without the busywork."

Supporting copy:

"Manage orders, customers, payments, and laundry status from one simple workspace."

Primary CTA:

"Start Free"

Secondary CTA:

"See How It Works"

Supporting message:

"Create an order once. LaundryOS handles the repetitive work."

Do not make the landing page unnecessarily long.

================================================== 15. AUTHENTICATION
==================================================

Only owners authenticate.

Sign Up:

Create your LaundryOS account

Fields:

- Name
- Email
- Password

CTA:

Create Account

Link:

Already have an account? Sign in

Login:

Welcome back

Fields:

- Email
- Password

CTA:

Sign In

Link:

Forgot password?

================================================== 16. ONBOARDING
==================================================

Onboarding consists of only three steps:

1. Business
2. Services
3. Ready

Show progress.

Do not ask unnecessary questions.

================================================== 17. BUSINESS SETUP
==================================================

Fields:

- Laundry name
- Phone / WhatsApp
- Address
- Opening hours

CTA:

Continue

================================================== 18. SERVICE SETUP
==================================================

Provide default services.

Example:

Wash
Rp7,000 / kg

Wash + Iron
Rp10,000 / kg

Express
Rp12,000 / kg

Owner can:

- edit
- delete
- add service

CTA:

Continue

================================================== 19. ONBOARDING COMPLETE
==================================================

Display:

"Your laundry is ready."

"You can start creating orders now."

CTA:

Go to Dashboard

================================================== 20. DASHBOARD
==================================================

The dashboard is an ACTION dashboard.

It is not an analytics wall.

Header:

Good morning, [Owner Name] 👋

[Current Date]

Primary CTA:

- Create Order

================================================== 21. DASHBOARD — ATTENTION
==================================================

Immediately show issues that require attention.

Example:

Needs Attention

🔴 2 overdue orders

🟠 4 orders ready for pickup

🟡 3 unpaid orders

Each item is clickable.

If there are no urgent issues:

"✓ Everything looks good."

"No urgent tasks right now."

================================================== 22. DASHBOARD — TODAY
==================================================

Show:

Today

Revenue
Rp1,240,000

Orders
34

Processing
12

Ready for Pickup
10

Keep this section simple.

================================================== 23. DASHBOARD — RECENT ORDERS
==================================================

Display recent orders.

Example:

LD-018
Andi Pratama
Wash + Iron
Ready for Pickup
Rp48,000

LD-017
Sari
Wash
Washing
Rp35,000

LD-016
Budi
Express
Completed
Rp60,000

CTA:

View All Orders

================================================== 24. DASHBOARD — AUTOMATION
==================================================

Show automation health.

Example:

Automation

✓ Tracking links
✓ Pickup reminders
✓ Daily summary
⚠ WhatsApp automation not connected

CTA:

Manage Automation

================================================== 25. CREATE ORDER
==================================================

This is the most important flow.

The owner should be able to create a standard order in under 30 seconds after becoming familiar with the application.

Do not create a complicated multi-page wizard.

Use one clean form with progressive disclosure.

================================================== 26. CREATE ORDER — CUSTOMER
==================================================

Header:

Create Order

Section:

Customer

Input:

Search name or phone number

Search results show:

Andi Pratama
0812••••8899
12 previous orders

Sari
0813••••2241
8 previous orders

Action:

- New Customer

================================================== 27. NEW CUSTOMER
==================================================

Use modal or drawer.

Fields:

Name
Phone / WhatsApp
Notes (optional)

CTA:

Save Customer

After saving:

- automatically select customer
- close modal/drawer
- return to order form
- do not reload page

================================================== 28. CREATE ORDER — SERVICE
==================================================

Display services as selectable cards.

Example:

Wash
Rp7,000 / kg

Wash + Iron
Rp10,000 / kg

Express
Rp12,000 / kg

Selected state:

- primary border
- subtle primary background
- check icon

================================================== 29. CREATE ORDER — WEIGHT
==================================================

Display:

Weight

[ 4.5 ] kg

Allow:

- typing
- plus/minus controls

Automatically calculate:

4.5 × Rp10,000
= Rp45,000

The owner must never manually calculate the price.

================================================== 30. CREATE ORDER — ADD-ONS
==================================================

Collapsed by default.

Label:

- Add extras

When expanded:

Premium fragrance +Rp3,000
Express +Rp10,000
Delivery +Rp5,000

Only show this section when needed.

================================================== 31. CREATE ORDER — PAYMENT
==================================================

Display:

Total
Rp48,000

Payment:

Cash
QRIS
Transfer
Unpaid

If "Unpaid" is selected:

Do not ask for payment amount.

If paid:

Amount received
[ Rp50,000 ]

Automatically calculate:

Change
Rp2,000

================================================== 32. CREATE ORDER — SUMMARY
==================================================

Desktop should have a sticky summary.

Example:

Order Summary

Andi Pratama

Wash + Iron
4.5 kg
Rp45,000

Premium fragrance
Rp3,000

Total
Rp48,000

[ Save Order ]

On mobile:

- keep total visible
- keep primary CTA accessible
- avoid unnecessary scrolling

================================================== 33. CREATE ORDER AUTOMATION
==================================================

When the owner clicks:

Save Order

the system automatically:

1. generates order number
2. creates secure tracking token
3. calculates estimated completion
4. creates order timeline
5. records payment status
6. updates dashboard
7. creates public tracking URL
8. schedules reminders if enabled
9. prepares customer notification
10. records activity

The owner should not manually perform these actions.

================================================== 34. ORDER NUMBER
==================================================

Format:

LD-YYMMDD-XXX

Example:

LD-260826-018

Automatically generated.

Never manually entered by the owner.

================================================== 35. ESTIMATED COMPLETION
==================================================

Each service has an estimated completion time.

Example:

Wash + Iron:
2 days

If created on:

August 26

Estimated completion:

August 28

The owner can override the estimated completion if necessary.

================================================== 36. ORDER SUCCESS
==================================================

After creation:

✓ Order Created

LD-260826-018

Andi Pratama

Total
Rp48,000

Actions:

Copy Tracking Link
Send WhatsApp
Print Receipt
View Order
Create Another Order

================================================== 37. ORDER STATUS
==================================================

Use only five primary statuses:

NEW
WASHING
IRONING
READY
COMPLETED

User-facing labels:

Baru
Dicuci
Disetrika
Siap Diambil
Selesai

================================================== 38. STATUS FLOW
==================================================

Normal flow:

NEW
↓
WASHING
↓
IRONING
↓
READY
↓
COMPLETED

The owner controls physical status transitions.

The system must NOT automatically claim:

- laundry washed
- laundry ironed
- laundry picked up

Those require human confirmation.

================================================== 39. STATUS AUTOMATION
==================================================

When owner changes:

IRONING → READY

system automatically:

1. updates tracking page
2. records timestamp
3. records status history
4. schedules pickup reminder
5. prepares notification
6. updates dashboard
7. marks order as waiting for pickup
8. optionally sends notification

================================================== 40. ORDER DETAIL
==================================================

Order detail should clearly display:

Order number
Customer
Service
Weight
Extras
Total
Payment status
Estimated completion
Current status

Primary actions should depend on current status.

Example:

If NEW:

[ Start Washing ]

If WASHING:

[ Start Ironing ]

If IRONING:

[ Mark Ready ]

If READY:

[ Mark Completed ]

================================================== 41. ORDER TIMELINE
==================================================

Display:

Order Activity

✓ Order created
✓ Washing
✓ Ironing
● Ready for pickup
○ Completed

Include timestamps.

================================================== 42. PUBLIC TRACKING
==================================================

Every order receives a secure public tracking link.

Example:

/track/LD-260826-018/secure-token

The token must be unpredictable.

Never expose internal database IDs.

================================================== 43. PUBLIC TRACKING PAGE
==================================================

No login.

Layout:

LaundryOS

Your Laundry Status

LD-260826-018

Andi Pratama

READY FOR PICKUP

Timeline:

✓ Order Received
✓ Washing
✓ Ironing
● Ready for Pickup
○ Completed

Total:

Rp48,000

CTA:

Contact Laundry

Only display safe public information.

================================================== 44. TRACKING STATES
==================================================

Loading:

"Loading your laundry status..."

Active:

Show current status.

Completed:

"Order Completed"

"This laundry has already been picked up."

Invalid:

"We could not find this order."

"Please check your tracking link."

Do not expose whether another order exists.

================================================== 45. CUSTOMER NOTIFICATIONS
==================================================

Potential notifications:

Order Created:

"Your laundry order has been created."

Ready:

"Your laundry is ready for pickup."

Pickup Reminder:

"Your laundry is still waiting for pickup."

Unpaid Reminder:

"Your laundry order still has an outstanding balance."

Notifications should use business-configured contact information.

================================================== 46. AUTOMATION SETTINGS
==================================================

Create:

Settings → Automation

Sections:

Customer Notifications

[ ON ] Send tracking link after order creation

[ ON ] Notify customer when laundry is ready

[ ON ] Remind customer if laundry is not picked up

[ ON ] Remind customer about unpaid orders

Business Alerts

[ ON ] Alert overdue orders

[ ON ] Alert low inventory

Reports

[ ON ] Daily summary

[ ON ] Weekly summary

Each automation must have:

- title
- explanation
- toggle
- optional timing

Do not expose technical configuration to the owner.

================================================== 47. AUTOMATION DEFAULTS
==================================================

Safe internal automations should be enabled by default:

- order number generation
- price calculation
- estimated completion
- tracking URL
- order timeline
- dashboard updates
- revenue calculations
- report calculations

External messaging must require appropriate setup.

WhatsApp automation must not pretend to work unless a real messaging provider is configured.

================================================== 48. AUTOMATION ARCHITECTURE
==================================================

Automation must NOT depend on the browser.

Do not implement reliable scheduled automation using:

- setTimeout
- setInterval
- browser-only timers
- localStorage
- client-only background jobs

Correct conceptual architecture:

Order Status Change
↓
Backend Event
↓
Automation Service
↓
Rule Evaluation
↓
Job Scheduler / Queue
↓
Automation Worker
↓
Action
↓
Notification Provider

Possible actions:

- create notification
- schedule reminder
- send WhatsApp
- update tracking
- update analytics
- create business alert

================================================== 49. AUTOMATION EXAMPLE
==================================================

When an order becomes READY:

Backend:

1. save status
2. create status history
3. emit order.ready event
4. automation service evaluates rules
5. notification is created
6. pickup reminder is scheduled
7. dashboard metrics are updated

After one day:

Worker checks:

Is order still READY?

If yes:

send reminder

If no:

cancel reminder

Never send stale reminders.

================================================== 50. AUTOMATION LOG
==================================================

Each automated action must be traceable.

Example:

Activity

10:02
Order created

10:02
Tracking link generated

10:03
Payment recorded

14:32
Status changed to Ready

14:32
Tracking updated

14:33
Notification sent

Automation logs create trust.

================================================== 51. SMART REMINDERS
==================================================

Overdue:

If current date > estimated completion date
and order is not COMPLETED:

Show:

🔴 Order LD-018 is overdue.

Unclaimed:

If order is READY for more than one day:

🟠 Customer has not picked up the laundry yet.

After three days:

🔴 Laundry has been waiting for 3 days.

Do not automatically delete, cancel, or complete the order.

================================================== 52. REPEAT ORDER
==================================================

When selecting an existing customer:

Andi Pratama

12 previous orders

Usually:

Wash + Iron

Average:

4.2 kg

Action:

[ Use Previous Order ]

This should prefill:

- service
- approximate weight
- extras

The owner can edit before saving.

================================================== 53. ORDERS PAGE
==================================================

Orders page should include:

Search
Status filter
Date filter
Payment filter

Desktop:

Use a clean table.

Columns:

Order
Customer
Service
Status
Total
Payment
Created
Action

Mobile:

Use cards instead of a dense table.

================================================== 54. ORDER SEARCH
==================================================

Search by:

- order number
- customer name
- phone number

Search should be fast.

Use debouncing if needed.

Do not make the owner press multiple unnecessary buttons.

================================================== 55. CUSTOMER PAGE
==================================================

Customer list:

Search customer

Andi Pratama
12 orders
Rp840,000 total

Sari
8 orders
Rp520,000 total

Customer detail:

Name
Phone
Total orders
Total spending
Last order
Common service
Order history

================================================== 56. SERVICES
==================================================

Services should be managed from Settings.

Each service:

- name
- price
- pricing unit
- estimated completion
- active/inactive

Example:

Wash
Rp7,000
per kg
2 days

Wash + Iron
Rp10,000
per kg
2 days

Express
Rp12,000
per kg
1 day

================================================== 57. REPORTS
==================================================

Reports should answer practical business questions.

Examples:

How much revenue did I generate?

How many orders did I receive?

Which service is most popular?

How many orders are still active?

How much is unpaid?

Display:

Revenue
Orders
Average Order Value
Top Services
Payment Breakdown
Order Status Breakdown

Do not build a complex accounting platform.

================================================== 58. DAILY SUMMARY
==================================================

Daily summary:

Today's Summary

34 orders

Rp1,240,000 revenue

12 active orders

10 ready for pickup

3 unpaid orders

Top service:

Wash + Iron

New customers:

5

================================================== 59. WEEKLY SUMMARY
==================================================

Weekly summary:

128 orders

Rp4,820,000 revenue

+14% vs previous week

Most popular service:

Wash + Iron

New customers:

18

Unpaid orders:

4

Overdue orders:

2

================================================== 60. INVENTORY
==================================================

Inventory must remain simple.

Track:

- detergent
- fragrance
- plastic
- hangers
- receipt paper
- other supplies

Example:

Detergent
8 L

Minimum:
10 L

Status:

⚠ Low Stock

When below threshold:

"Detergent stock is low."

Do not build warehouse management.

================================================== 61. SETTINGS
==================================================

Settings sections:

Business

- name
- phone
- address
- opening hours
- logo

Services

- service management

Automation

- notifications
- reminders
- reports

Receipt

- receipt configuration
- footer message

Account

- profile
- password
- logout

================================================== 62. RECEIPT
==================================================

Receipt should contain:

Laundry name
Phone
Order number
Customer
Service
Weight
Extras
Subtotal
Total
Payment
Change
Date
Estimated completion

Optional footer:

"Thank you for your business."

Provide:

Print Receipt

The receipt must be simple and printer-friendly.

================================================== 63. EMPTY STATES
==================================================

Orders:

"No orders yet."

"Create your first laundry order."

[ + Create Order ]

Customers:

"No customers yet."

"Customers will appear here after you create an order."

Reports:

"Not enough data yet."

"Create a few orders to see your business insights."

================================================== 64. ERROR UX
==================================================

Never expose technical errors.

Bad:

"500 Internal Server Error"

Good:

"Something went wrong."

"Your order was not saved."

[ Try Again ]

Validation example:

"Please enter the customer's phone number."

================================================== 65. LOADING STATES
==================================================

Every asynchronous operation needs a loading state.

Examples:

- page loading
- customer search
- order loading
- order creation
- payment submission
- status update
- report loading
- automation update

Button example:

Save Order
→
Saving...

Do not freeze the entire application unnecessarily.

================================================== 66. SUCCESS STATES
==================================================

Major actions should show clear success.

Example:

✓ Order created successfully

Minor actions can use toast notifications.

================================================== 67. MOBILE UX
==================================================

Mobile is a first-class experience.

Owner must be able to run the business from a phone.

Use:

- full-width actions
- large touch targets
- sticky primary actions
- bottom navigation
- cards
- drawers
- mobile-friendly forms

Do not simply shrink desktop UI.

================================================== 68. DESKTOP UX
==================================================

Desktop:

- fixed sidebar
- centered content
- max-width layouts
- clean tables
- two-column forms where useful
- sticky order summary

================================================== 69. ACCESSIBILITY
==================================================

Follow WCAG AA principles.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus
- accessible labels
- sufficient contrast
- 44px touch targets
- status not communicated by color alone
- clear error messages
- screen reader support
- accessible dialogs
- accessible form controls

================================================== 70. CODEBASE ARCHITECTURE
==================================================

Build a clean, scalable, API-ready codebase.

Prioritize:

- separation of concerns
- feature ownership
- reusable components
- typed data
- centralized API communication
- centralized validation
- isolated business logic
- maintainability
- testability

Do not put business logic directly inside UI components.

Do not put random API requests inside page components.

Do not duplicate logic.

Do not create giant components.

================================================== 71. FEATURE-BASED FOLDER STRUCTURE
==================================================

Use a feature-oriented architecture.

Recommended:

src/
├── app/
│ ├── routes/
│ ├── layouts/
│ └── providers/
│
├── components/
│ ├── ui/
│ ├── layout/
│ ├── feedback/
│ └── common/
│
├── features/
│ ├── auth/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── types/
│ │ └── validation/
│ │
│ ├── dashboard/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ ├── orders/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ ├── types/
│ │ └── validation/
│ │
│ ├── customers/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ ├── services/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ ├── payments/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ ├── automation/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ ├── reports/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── types/
│ │
│ └── inventory/
│ ├── components/
│ ├── hooks/
│ ├── services/
│ └── types/
│
├── lib/
│ ├── api/
│ ├── auth/
│ ├── utils/
│ ├── constants/
│ └── formatters/
│
├── hooks/
│
├── types/
│
├── config/
│
└── styles/

Adapt this structure to the selected framework when necessary.

Do not create empty or unnecessary folders.

Every folder must have a clear responsibility.

================================================== 72. SHARED COMPONENT RULE
==================================================

Shared UI components:

components/ui/

Examples:

Button
Input
Select
Modal
Drawer
Badge
Card
Toast
Dropdown
Skeleton
Table
Tabs
DatePicker

Only create shared components when they provide real reuse or meaningful abstraction.

Do not turn every HTML element into a component.

================================================== 73. FEATURE OWNERSHIP
==================================================

Order-specific logic belongs inside:

features/orders/

Customer-specific logic belongs inside:

features/customers/

Automation-specific logic belongs inside:

features/automation/

Do not dump feature-specific code into generic utils.

================================================== 74. API ARCHITECTURE
==================================================

The frontend must be API-ready.

Never couple UI components directly to backend implementation.

Architecture:

UI
↓
Hooks
↓
Feature Service
↓
API Client
↓
Backend API

Example:

OrderPage
↓
useOrders()
↓
orderService
↓
apiClient
↓
Backend

================================================== 75. CENTRAL API CLIENT
==================================================

Create:

lib/api/api-client

Responsibilities:

- base URL
- headers
- authentication
- request handling
- response parsing
- error normalization
- timeout
- common interceptors

Do not repeat fetch configuration throughout the application.

================================================== 76. FEATURE SERVICES
==================================================

Example:

features/orders/services/order.service

Methods:

getOrders()
getOrder(id)
createOrder(payload)
updateOrder(id, payload)
updateStatus(id, status)

UI components must not directly call fetch.

================================================== 77. TYPES
==================================================

Create strongly typed domain models.

Important entities:

User
Business
Customer
Service
Order
OrderItem
Payment
InventoryItem
Notification
AutomationSetting
OrderStatusHistory
Expense

Avoid unnecessary any.

Do not use any as a shortcut.

================================================== 78. ORDER DOMAIN MODEL
==================================================

Conceptually:

Order:

- id
- orderNumber
- customerId
- status
- items
- subtotal
- extras
- total
- paymentStatus
- payment
- estimatedCompletionAt
- trackingToken
- createdAt
- updatedAt

The actual implementation may adapt this structure.

================================================== 79. ENUMS AND CONSTANTS
==================================================

Do not scatter strings.

Use centralized types/constants.

OrderStatus:

NEW
WASHING
IRONING
READY
COMPLETED

PaymentStatus:

PAID
UNPAID
PARTIAL

Automation types should also be centralized.

================================================== 80. VALIDATION
==================================================

Validation must be separated from presentation.

Order validation should validate:

- customer
- service
- weight
- extras
- payment

Use a schema-based validation approach when supported by the stack.

UI displays validation errors.

Validation logic should not be duplicated inside JSX.

================================================== 81. BUSINESS LOGIC
==================================================

Business logic must be isolated.

Examples:

calculateOrderTotal()
calculatePaymentChange()
calculateEstimatedCompletion()
isOrderOverdue()
isPickupReminderDue()
isLowStock()

Prefer pure functions where possible.

Business logic must not depend on UI rendering.

================================================== 82. SERVER AS SOURCE OF TRUTH
==================================================

Backend is authoritative for:

- orders
- customers
- payments
- revenue
- status
- automation
- inventory

Frontend state is not authoritative.

Important mutations must be confirmed by the server.

================================================== 83. OPTIMISTIC UI
==================================================

Use optimistic UI only for safe interactions.

Good:

- read notification
- toggle simple preference

Be cautious with:

- payment
- order creation
- order completion
- financial changes

Financial operations must wait for server confirmation.

================================================== 84. ENVIRONMENT VARIABLES
==================================================

Never hardcode:

- API URLs
- API keys
- secrets
- credentials

Use environment variables.

Create:

.env.example

Never commit real secrets.

================================================== 85. MOCK API
==================================================

If backend is not yet available, use mock services.

Mock services must implement the same interfaces as the future API services.

Example:

orderService.getOrders()

must work whether implementation uses:

MockOrderService

or:

ApiOrderService

Do not put mock data directly inside UI components.

================================================== 86. API ENDPOINT CONCEPT
==================================================

Conceptual endpoints:

POST /auth/register
POST /auth/login

GET /dashboard/summary

GET /orders
GET /orders/:id
POST /orders
PATCH /orders/:id
PATCH /orders/:id/status

GET /customers
GET /customers/:id
POST /customers
PATCH /customers/:id

GET /services
POST /services
PATCH /services/:id
DELETE /services/:id

GET /reports

GET /inventory

GET /automation/settings
PATCH /automation/settings

GET /notifications

GET /public/orders/:trackingToken

Adapt to actual backend architecture.

================================================== 87. API ERROR FORMAT
==================================================

Normalize errors.

Conceptual:

{
success: false,
error: {
code: "ORDER_NOT_FOUND",
message: "Order could not be found."
}
}

Do not expose raw backend errors.

Map technical errors into friendly UI messages.

================================================== 88. PUBLIC TRACKING API
==================================================

Conceptual:

GET /public/orders/:trackingToken

Return only safe public information.

Example:

{
orderNumber,
businessName,
customerFirstName,
status,
statusHistory,
total,
estimatedCompletionAt
}

Do not expose:

- internal IDs
- private customer details
- business analytics
- payment internals
- other orders

================================================== 89. SECURITY
==================================================

Backend must enforce:

- authentication
- ownership
- authorization
- validation
- rate limiting where appropriate
- secure public tracking
- payment integrity

Frontend is NOT the security boundary.

Use unpredictable tracking tokens.

Do not expose database IDs publicly.

================================================== 90. DATE AND TIME
==================================================

Use a consistent date/time strategy.

Store timestamps in a backend-safe format.

Convert to business-local time only at the presentation layer.

Do not manually manipulate date strings throughout components.

================================================== 91. FORMATTERS
==================================================

Centralize:

formatCurrency()
formatDate()
formatPhoneNumber()
formatOrderNumber()
formatRelativeTime()

Do not duplicate formatting logic across screens.

================================================== 92. NO MAGIC VALUES
==================================================

Do not scatter values such as:

if days > 3

Instead use:

PICKUP_REMINDER_DAYS

Centralize configuration values.

================================================== 93. NAMING
==================================================

Components:

PascalCase

Functions:

camelCase

Constants:

UPPER_SNAKE_CASE

Types:

PascalCase

Use one consistent file naming convention.

Do not randomly mix naming styles.

================================================== 94. COMPONENT SIZE
==================================================

Avoid giant components.

Bad:

Dashboard.tsx containing:

- API calls
- calculations
- notifications
- charts
- tables
- modals
- business logic

Prefer:

Dashboard
├── DashboardHeader
├── AttentionPanel
├── TodaySummary
├── RecentOrders
└── AutomationSummary

================================================== 95. NO DUPLICATION
==================================================

Avoid duplicated:

- API logic
- validation
- formatting
- calculations
- business rules
- UI patterns

But do not over-abstract prematurely.

Simple code is preferred over clever code.

================================================== 96. CODE QUALITY
==================================================

Before considering a feature complete:

- no unnecessary any
- no duplicated business logic
- no API calls directly inside UI components
- no hardcoded secrets
- no magic values
- no giant components
- no unused imports
- no dead code
- no unnecessary dependencies
- consistent naming
- consistent error handling
- consistent loading states
- responsive behavior
- accessibility

================================================== 97. README
==================================================

Create README.md containing:

- product overview
- tech stack
- installation
- environment variables
- development commands
- build commands
- folder structure
- API configuration
- deployment notes

Create:

.env.example

================================================== 98. DATABASE CONCEPT
==================================================

Conceptual entities:

User
Business
Customer
Service
Order
OrderItem
Payment
InventoryItem
Expense
AutomationSetting
OrderStatusHistory
Notification

Relationships:

Business
├── Users
├── Customers
├── Orders
├── Services
├── Inventory
├── Expenses
└── AutomationSettings

Order
├── Customer
├── OrderItems
├── Payment
├── StatusHistory
└── Notifications

The database implementation should be normalized enough to avoid unnecessary duplication.

================================================== 99. DATA OWNERSHIP
==================================================

Every business-owned entity must be scoped to the correct business.

An owner must only be able to access their own:

- customers
- orders
- services
- reports
- inventory
- settings

Never trust a business ID supplied blindly by the frontend.

The backend must derive and validate ownership from authentication.

================================================== 100. PAYMENT RULES
==================================================

Payment states:

PAID
UNPAID
PARTIAL

For paid orders:

record:

- payment method
- amount
- timestamp

If cash:

calculate change.

The frontend must never be the authority for final financial calculations.

The backend should recalculate and validate totals.

================================================== 101. PRICE CALCULATION
==================================================

Example:

Service:

Wash + Iron

Price:

Rp10,000 / kg

Weight:

4.5 kg

Subtotal:

Rp45,000

Extra:

Premium fragrance
Rp3,000

Total:

Rp48,000

Frontend can show a live preview.

Backend must recalculate the final amount.

Never trust a total submitted by the client.

================================================== 102. ORDER CREATION TRANSACTION
==================================================

Order creation should conceptually be atomic.

When creating an order:

- validate customer
- validate service
- validate weight
- calculate price
- create order
- create order items
- create payment record if applicable
- create status history
- generate tracking token
- create automation event

If a critical operation fails, do not leave inconsistent financial/order data.

Use database transactions where appropriate.

================================================== 103. AUTOMATION SAFETY
==================================================

Never automatically make claims about physical actions.

The system must NOT automatically set:

WASHING

IRONING

COMPLETED

unless triggered by explicit owner action or a properly defined business workflow.

The system CAN automatically:

- calculate
- schedule
- notify
- remind
- detect
- summarize
- report
- generate
- update derived analytics

================================================== 104. NOTIFICATION SAFETY
==================================================

Never claim a notification was sent if no messaging provider is connected.

Possible states:

PENDING
SENT
FAILED
CANCELLED

If WhatsApp is not configured:

show:

"WhatsApp automation is not connected."

Do not fake the integration.

================================================== 105. RESPONSIVE DESIGN
==================================================

Breakpoints should be sensible.

Desktop:

> = 1024px

Tablet:
768px–1023px

Mobile:
< 768px

The exact breakpoints can adapt to the chosen framework.

Mobile must remain fully functional.

================================================== 106. PERFORMANCE
==================================================

Prioritize:

- fast initial load
- minimal unnecessary requests
- lazy loading where appropriate
- efficient list rendering
- debounced search
- optimized images
- caching where appropriate
- pagination for large lists

Do not prematurely optimize everything.

Optimize actual expensive operations.

================================================== 107. ACCESSIBILITY STATES
==================================================

All interactive components must support:

- hover
- focus
- active
- disabled
- loading
- error
- success

Forms must have accessible labels.

Modals must manage focus correctly.

================================================== 108. TABLE UX
==================================================

Desktop tables:

- clear header
- compact but readable rows
- status badges
- action menu
- pagination

Mobile:

Convert table rows into cards.

Do not create horizontally unusable tables on mobile.

================================================== 109. SEARCH UX
==================================================

Search should support:

- loading
- results
- empty
- error

For customer search:

Search name or phone.

Show recent customers when the field is empty.

================================================== 110. NOTIFICATION CENTER
==================================================

Owner notification center:

🔴 2 overdue orders
🟠 4 ready for pickup
🟡 3 unpaid orders
✓ 12 orders completed

Group notifications by urgency.

Do not spam the owner.

================================================== 111. DAILY OWNER DIGEST
==================================================

Every morning:

Good morning, Budi 👋

Today's summary:

12 orders processing
4 ready for pickup
2 unpaid orders
1 low-stock item

[ Open LaundryOS ]

The digest should be concise.

================================================== 112. AUTOMATION HEALTH
==================================================

Settings should show:

Automation Health

✓ Tracking
✓ Reminders
✓ Daily Summary
⚠ WhatsApp not connected

The owner should immediately understand which automations work.

================================================== 113. RECEIPT UX
==================================================

After order creation:

[ Print Receipt ]

The receipt should be optimized for common thermal printer sizes if supported.

Keep it simple.

================================================== 114. DELETE RULES
==================================================

Do not allow destructive actions without confirmation.

For example:

Delete customer?

Show:

"This will remove the customer from your active customer list."

If historical orders depend on the customer, do not blindly delete the record.

Prefer archive/deactivate when appropriate.

================================================== 115. CONFIRMATION RULES
==================================================

Do not ask confirmation for harmless actions.

Good:

Save customer

No confirmation.

For destructive or irreversible actions:

Require confirmation.

Example:

Delete service?

"Orders already using this service will not be affected."

================================================== 116. TOAST RULES
==================================================

Use toast notifications for:

- saved
- copied
- updated
- deleted
- settings changed

Do not use toast for critical information that must remain visible.

================================================== 117. FORM UX
==================================================

Forms should:

- use clear labels
- show required fields
- validate near the field
- preserve entered data after validation failure
- avoid unnecessary resets
- focus the first invalid field
- prevent accidental double submission

================================================== 118. BUTTON COPY
==================================================

Use action-oriented labels.

Good:

Create Order
Save Customer
Mark Ready
Complete Order
Send Reminder
Copy Tracking Link

Avoid vague labels:

Submit
Process
Continue Here
Action

================================================== 119. PRODUCT LANGUAGE
==================================================

UI copy should be:

- concise
- friendly
- direct
- human
- non-technical

Avoid:

"Execute transaction"

Prefer:

"Save Order"

Avoid:

"Initiate workflow"

Prefer:

"Create Order"

================================================== 120. DESIGN SYSTEM CONSISTENCY
==================================================

All pages must share:

- typography
- colors
- spacing
- buttons
- inputs
- badges
- cards
- dialogs
- navigation
- states

Do not design each page as a separate visual product.

================================================== 121. PAGE INVENTORY
==================================================

Build these pages:

Public:

1. Landing
2. Login
3. Sign Up
4. Public Tracking

Owner:

5. Dashboard
6. Orders
7. Order Detail
8. Create Order
9. Customers
10. Customer Detail
11. Reports
12. Settings
13. Services Settings
14. Automation Settings
15. Inventory
16. Account Settings

================================================== 122. ROUTING
==================================================

Use protected routes for owner pages.

Conceptual:

/
/login
/signup
/track/:orderNumber/:token

/app
/app/orders
/app/orders/new
/app/orders/:id
/app/customers
/app/customers/:id
/app/reports
/app/inventory
/app/settings
/app/settings/services
/app/settings/automation
/app/settings/account

Adapt to framework routing conventions.

================================================== 123. AUTHENTICATION FLOW
==================================================

Unauthenticated user accessing /app:

redirect to login.

Authenticated owner accessing /login:

redirect to dashboard.

Session expiration:

show a clear message and redirect to login.

Do not silently lose unsaved form data if avoidable.

================================================== 124. ONBOARDING FLOW
==================================================

New owner:

Signup
↓
Business setup
↓
Service setup
↓
Dashboard

Existing owner:

Login
↓
Dashboard

If onboarding is incomplete:

redirect to onboarding.

================================================== 125. ORDER STATE MACHINE
==================================================

Order states:

NEW
WASHING
IRONING
READY
COMPLETED

Valid transitions:

NEW → WASHING

WASHING → IRONING

IRONING → READY

READY → COMPLETED

The backend should validate state transitions.

Do not allow arbitrary invalid transitions.

================================================== 126. ORDER HISTORY
==================================================

Every status change creates a status history record.

Example:

NEW
createdAt

WASHING
updatedAt

IRONING
updatedAt

READY
updatedAt

COMPLETED
updatedAt

This is useful for:

- timeline
- analytics
- debugging
- customer tracking
- operational history

================================================== 127. ORDER ACTIVITY
==================================================

Activity should distinguish:

OWNER ACTION

and

SYSTEM ACTION

Example:

Owner:
"Changed status to Ready"

System:
"Tracking page updated"

System:
"Pickup reminder scheduled"

This makes automation transparent.

================================================== 128. BUSINESS RULES
==================================================

Order total:

sum(order items) + extras

Estimated completion:

createdAt + service estimated duration

Overdue:

current time > estimated completion
AND status != COMPLETED

Unclaimed:

status == READY
AND ready duration > configured threshold

Unpaid:

payment status != PAID

Low stock:

quantity <= minimum quantity

================================================== 129. REPORTING RULES
==================================================

Revenue should be based on valid payment/order rules defined by backend.

Do not simply sum client-side displayed totals.

Reports should be generated from authoritative backend data.

================================================== 130. AUDITABILITY
==================================================

Important actions should be auditable:

- order created
- payment recorded
- status changed
- order completed
- service changed
- automation changed

This does not require a complex enterprise audit system, but important business events should be traceable.

================================================== 131. TESTABILITY
==================================================

Important business logic should be easy to unit test.

Prioritize tests for:

- price calculation
- payment change
- order status transitions
- overdue detection
- pickup reminder logic
- low-stock logic
- permission/ownership logic

UI tests should focus on critical user journeys.

================================================== 132. CRITICAL ACCEPTANCE TEST
==================================================

A new owner should be able to:

1. sign up
2. configure business
3. configure services
4. reach dashboard
5. create a customer
6. create an order
7. calculate price automatically
8. record payment
9. receive order number
10. receive tracking link
11. update status
12. see public tracking change
13. mark order completed
14. see revenue update

without needing technical knowledge.

================================================== 133. CRITICAL ORDER TEST
==================================================

Test:

Customer:
Andi Pratama

Service:
Wash + Iron

Price:
Rp10,000/kg

Weight:
4.5kg

Extra:
Premium fragrance Rp3,000

Payment:
Cash Rp50,000

Expected:

Subtotal:
Rp45,000

Extra:
Rp3,000

Total:
Rp48,000

Change:
Rp2,000

Order number generated automatically.

Estimated completion generated automatically.

Tracking link generated automatically.

================================================== 134. CRITICAL AUTOMATION TEST
==================================================

Given:

Order status = READY

Automation:
Pickup reminder enabled

After configured delay:

System checks current status.

If still READY:

Create/send reminder.

If COMPLETED:

Do not send reminder.

================================================== 135. CRITICAL SECURITY TEST
==================================================

Given:

Owner A

Owner B

Owner A must never access:

- Owner B orders
- Owner B customers
- Owner B reports
- Owner B settings

Public tracking token must only expose the specific order.

================================================== 136. CRITICAL UX TEST
==================================================

Ask:

Can the owner understand what to do within 5 seconds of opening the dashboard?

Can the owner create a normal order quickly?

Can the owner understand order status immediately?

Can the customer track an order without logging in?

Can the owner understand which automations are active?

Can the owner recover from errors without technical knowledge?

If the answer is no, simplify the UI.

================================================== 137. IMPLEMENTATION ORDER
==================================================

Build in this order.

PHASE 1 — FOUNDATION

- project setup
- design system
- typography
- colors
- routing
- layouts
- responsive navigation
- reusable UI components
- API client abstraction
- types
- environment configuration

PHASE 2 — AUTH

- signup
- login
- logout
- protected routes
- session handling

PHASE 3 — ONBOARDING

- business setup
- service setup
- onboarding completion

PHASE 4 — CUSTOMERS

- customer list
- customer search
- customer creation
- customer detail
- order history

PHASE 5 — ORDERS

- order creation
- service selection
- weight
- extras
- price calculation
- payment
- order detail
- order status
- order history

PHASE 6 — PUBLIC TRACKING

- secure tracking token
- public tracking page
- tracking status
- responsive tracking UX

PHASE 7 — AUTOMATION

- automation settings
- status events
- reminders
- overdue detection
- notification architecture
- automation logs

PHASE 8 — DASHBOARD

- attention panel
- daily summary
- recent orders
- automation health

PHASE 9 — REPORTS

- revenue
- order metrics
- popular services
- payment breakdown
- weekly summary

PHASE 10 — INVENTORY

- inventory items
- minimum stock
- low-stock alerts

PHASE 11 — POLISH

- loading states
- empty states
- error states
- accessibility
- mobile refinement
- performance
- testing
- code cleanup

================================================== 138. IMPLEMENTATION PRIORITY
==================================================

P0:

Authentication
Business Setup
Services
Customers
Create Order
Order Detail
Payment
Order Status
Public Tracking

P1:

Order Automation
Tracking Automation
Reminders
Overdue Detection
Dashboard Automation
Notifications

P2:

Reports
Daily Summary
Weekly Summary
Customer Insights

P3:

Inventory
WhatsApp Integration
Repeat Orders
Advanced Notifications

P4:

Future AI features
Multi-location
Advanced accounting
Native mobile app
Marketplace integrations

Do not build P3/P4 before P0/P1 are stable.

================================================== 139. AI IMPLEMENTATION RULE
==================================================

Do not attempt to implement the entire application as one giant generated file.

Implement incrementally.

Each feature must:

- have clear ownership
- use reusable components
- use typed services
- use validation
- use proper loading/error states
- integrate with the API layer
- remain responsive
- remain accessible

Before adding another feature, keep the existing architecture clean.

================================================== 140. NO FAKE FEATURES
==================================================

Do not create fake:

- WhatsApp integrations
- payment integrations
- AI features
- notifications
- background jobs
- analytics

If a feature is not actually connected, clearly represent it as:

"Not connected"

or:

"Demo / Mock"

Never make the user believe a fake integration is real.

================================================== 141. NO PLACEHOLDER UX IN FINAL PRODUCT
==================================================

Avoid:

- Lorem ipsum
- fake random dashboards
- meaningless charts
- placeholder buttons
- "Coming soon" everywhere
- random user data
- random fake notifications

If mock data is required during development, structure it clearly and make the data realistic.

================================================== 142. FINAL ENGINEERING PRINCIPLE
==================================================

Build LaundryOS as if another developer will inherit this codebase tomorrow.

A developer should immediately understand:

Where are orders handled?

Where is order validation?

Where is price calculation?

Where is the order API?

Where is authentication?

Where is automation?

Where are shared components?

Where are types?

Where are business rules?

Where are API errors normalized?

Where should a new feature be added?

If these answers are difficult to find, the architecture is not clean enough.

================================================== 143. FINAL UX PRINCIPLE
==================================================

The owner should not need to become good at using software.

The software should reduce the amount of work the owner has to do.

The ideal experience is:

Owner enters the order once.

LaundryOS:

- remembers
- calculates
- tracks
- reminds
- reports
- notifies
- summarizes
- detects problems

automatically.

================================================== 144. FINAL PRODUCT PRINCIPLE
==================================================

Prioritize:

Clarity > Features

Speed > Configuration

Automation > Manual Entry

Action > Analytics

Simple UX > Complex UX

Real Business Value > Decorative UI

Maintainability > Clever Code

Security > Convenience

Reliable Automation > Fake Automation

================================================== 145. DEFINITION OF DONE
==================================================

The project is not considered complete simply because all screens exist.

A feature is complete only when:

- UI is implemented
- responsive behavior works
- loading state exists
- empty state exists
- error state exists
- validation exists
- API/service layer exists
- types exist
- business logic is separated
- accessibility is considered
- security boundaries are respected
- no unnecessary duplication exists
- code is clean
- feature integrates with existing architecture

The final application must feel like a real product that could evolve into a production system.

================================================== 146. FINAL OUTPUT EXPECTATION
==================================================

When implementing the project:

1. Establish the architecture first.
2. Establish the design system.
3. Build the application shell.
4. Build authentication.
5. Build onboarding.
6. Build customers.
7. Build orders.
8. Build payments.
9. Build public tracking.
10. Build automation architecture.
11. Build dashboard.
12. Build reports.
13. Build inventory.
14. Polish UX.
15. Test critical flows.
16. Remove dead code.
17. Verify responsive layouts.
18. Verify accessibility.
19. Verify API boundaries.
20. Verify that the codebase remains clean.

Do not prioritize visual complexity over functionality.

Do not prioritize feature count over usability.

Do not prioritize speed of generation over code quality.

The final result should be:

MODERN
SIMPLE
FAST
AUTOMATED
API-READY
SECURE
RESPONSIVE
ACCESSIBLE
MAINTAINABLE
PRODUCTION-QUALITY

The product should communicate one idea immediately:

"Laundry management without the busywork."
