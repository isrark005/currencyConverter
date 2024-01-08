# Currency Converter App README

## Overview

This repository contains the source code for a Currency Converter application built using React. The app allows users to convert currency values between different currencies, provides historical exchange rate tracking, and displays the exchange rate history for the last 10 days in Indian Rupees.

## Features

- **Currency Conversion**: Users can input an amount, select the source currency (From), choose the target currency (To), and convert the amount with real-time exchange rates.
  
- **Currency Swap**: The app allows users to easily swap the source and target currencies along with their corresponding amounts.

- **Historical Exchange Rate Tracking**: The app provides a historical exchange rate tracking feature, displaying the daily exchange rate for the last 10 days in Indian Rupees against 1 USD.

## Components and Hooks

- **InputBox Component**: A reusable component for input fields with labels, used for both the source and target currencies.

- **UsdHistory Component**: Used to display historical exchange rate data.

- **useCurrencyInfo Hook**: Fetches and manages currency information based on the selected currency.

- **CountryName Hook**: Fetches and manages country names based on currency codes.

## Dependencies

- React: JavaScript library for building user interfaces.
- useState, useId, useEffect: React hooks for managing component state and lifecycle.
- `useCurrencyInfo` and `CountryName` hooks: Custom hooks for fetching and managing currency information and country names.
- Tailwind CSS: Utility-first CSS framework for styling the user interface.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-currency-converter.git
   cd your-currency-converter
