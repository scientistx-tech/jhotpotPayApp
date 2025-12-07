# Recharge Flow - Reusable Components

## Overview
Created a complete recharge flow with reusable, modular components matching the provided mockup designs.

## Components Created

### 1. **RechargeHeader** (`recharge-header.tsx`)
- Header for all recharge pages
- Props: `title`, `showBack`, `onBackPress`, `rightIcon`, `onRightPress`
- Features: Back button, customizable title, right action button

### 2. **RecipientCard** (`recipient-card.tsx`)
- Displays recipient information (name, phone)
- Props: `name`, `phone`, `avatarSource`, `onChangePress`, `icon`, `iconColor`
- Features: Avatar with icon fallback, edit button, clean design

### 3. **TypeSelector** (`type-selector.tsx`)
- Radio button selector for recharge type (Prepaid, Postpaid, Skitto)
- Props: `selectedType`, `onTypeChange`
- Features: Radio buttons, responsive layout

### 4. **AmountSelector** (`amount-selector.tsx`)
- Category tabs (Amount, Internet, Minute, Bundle, Call Rate)
- Grid layout for amount/offer options
- Props: `selectedCategory`, `onCategoryChange`, `selectedAmount`, `onAmountSelect`, `amounts`
- Features: Horizontal scroll tabs, 3-column grid, "New" badges

### 5. **OfferCard** (`offer-card.tsx`)
- Individual offer/plan card
- Props: `duration`, `validity`, `price`, `isNew`, `onPress`
- Features: Icon, duration info, validity period, price display

### 6. **RechargeDetailsModal** (`recharge-details-modal.tsx`)
- Bottom sheet modal for reviewing recharge details
- Props: `visible`, `onClose`, `recipientName`, `recipientPhone`, `amount`, `onProceed`, `availableBalance`
- Features: Recipient info, amount display, balance check, proceed button

### 7. **ActionButton** (`action-button.tsx`)
- Versatile button component
- Props: `label`, `onPress`, `variant` (primary/secondary/outline), `disabled`
- Features: 3 variants, disabled state, consistent styling

## Pages Implemented

### 1. **recharge_enter_number.tsx**
- First step: Enter or select phone number
- Components used: RechargeHeader, RecipientCard, RoundedInput, ActionButton
- Flow: User enters phone number → Next button navigates to type selection

### 2. **recharge_type_amount.tsx**
- Second step: Select recharge type and amount
- Components used: RechargeHeader, RecipientCard, TypeSelector, AmountSelector, ActionButton
- Features: Dynamic amount options based on category selection
- Pre-loaded options for: Amount, Internet, Minute, Bundle, Call Rate

### 3. **recharge_internet.tsx**
- Third step: Browse and select offers
- Components used: RechargeHeader, RecipientCard, OfferCard, ActionButton, RechargeDetailsModal
- Features: List of available offers with "New" badges, balance display
- Modal shows review screen before final confirmation

## Navigation Flow
```
Home (index.tsx)
  ↓ Click "Recharge" card
  ↓
recharge_enter_number (Enter phone)
  ↓ Click "Next"
  ↓
recharge_type_amount (Select type & amount)
  ↓ Click "Next"
  ↓
recharge_internet (Browse offers)
  ↓ Click "Proceed"
  ↓
RechargeDetailsModal (Review & confirm)
```

## Key Features
- ✅ Fully reusable components
- ✅ Consistent theming with existing app
- ✅ Responsive design matching mockups
- ✅ Type-safe TypeScript implementation
- ✅ Form validation (Next button disabled when no selection)
- ✅ Modal-based confirmation flow
- ✅ Support for dynamic data (amounts, offers)

## Color Scheme
- Primary: `#248AEF` (tint color)
- Success: `#4CAF50`
- Error: `#FF6B6B`
- Warning: `#FFD93D`
- Background: Theme-aware (light/dark)

## Usage Example
```tsx
// In recharge_enter_number.tsx
import { RechargeHeader, RecipientCard, ActionButton } from '@/components/recharge';

<RechargeHeader title="Mobile Recharge" />
<RecipientCard name={name} phone={phone} onChangePress={handleChange} />
<ActionButton label="Next" onPress={handleNext} />
```
