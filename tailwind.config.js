module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],

  theme: {
    extend: {
      screens: {
        'xxl': '1650px', // custom breakpoint
      },
    },
  },
  plugins: [require('flowbite/plugin')
  ],
};
