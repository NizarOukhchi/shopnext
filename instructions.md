# Project overview

You are building a shopping list web application that allows users to save products while browsing and organize them into lists. Users can create multiple lists and add products to them. Additionally, users can share their lists with others, with the option to set access permissions as either read-only or full access (add and delete products)

You wll be using Nextjs 15, Shadcn, tailwindcss, lucid icons and Convex

# Core functionalities

1. Create, Edit, and Delete Lists
   • Creating a List:
   • Users can create a new list by clicking the “Create List” button in the left sidebar.
   • Each list is displayed in a user-friendly format with intuitive navigation.
   • List Display and Pagination:
   • Products within a list are displayed with infinite scrolling for seamless navigation.
   • Pagination ensures optimal performance and an efficient user experience for lists containing numerous products.
   • Filtering Products:
   • Products within a list can be filtered by category to help users quickly find items of interest.
   • Deleting a List:
   • Users can delete a list by selecting the delete button, ensuring easy management of unwanted lists.

2. Add and Remove Products Within a List
   • Adding a Product:
   • When a user clicks the “Add” button, a popover appears, allowing them to enter the product URL.
   • The backend scrapes the entered URL to automatically extract product details, including:
   • Title: The product name.
   • Image: A primary image of the product.
   • Price: The listed price of the product.
   • Description: A summary or details about the product.
   • Category: Classification of the product (e.g., electronics, clothing).
   • Shop Name: The name of the e-commerce site selling the product.
   • Website Icon: A favicon or logo representing the e-commerce website.
   • The extracted product details are added directly to the selected list.
   • Removing a Product:
   • Users can remove products from a list by clicking a delete button next to the product, ensuring easy management of items.

3. Invite Other Users to Collaborate on Lists
   • Inviting Users:
   • Users can invite collaborators to a list via email or a unique link.
   • Invitations can be sent from within the app, streamlining the sharing process.
   • Configurable Access Levels:
   • Read-Only Access: Invited users can view the list and its contents but cannot make changes.
   • Full Access: Invited users can add new products, remove existing ones, and edit the list.
   • Access levels can be updated by the list owner at any time to adapt to changing collaboration needs.

# Doc

# Current file structure
