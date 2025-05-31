var express = require("express");
var userController = require("./Controllers/Usercontroller");
var complaintController = require("./Controllers/complainedcontrolller");
var orgcontroller = require("./Controllers/Organizationcontroller");
var productController = require("./Controllers/ProductController");
var wishlistController=require("./Controllers/wishlistcontroller")
var eventController=require("./Controllers/EventController")
var eventController=require("./Controllers/EventController")
var chatController=require("./Controllers/messagecontroller")

var route = express.Router();

route.post('/user/register', userController.uploadimg, userController.saveuser);
route.post('/user/login', userController.loginvalidateuser);
route.get('/viewuser/:id', userController.viewOneUser);
route.get('/viewallusers', userController.viewAllUsers);
route.put('/updateuser/:id', userController.uploadimg, userController.updateUser);
route.post('/user/forgotpassword', userController.forgotPassword);

route.post('/organization/register', orgcontroller.uploadimg, orgcontroller.saveorg);
route.post('/organization/login', orgcontroller.loginvalidateorg);
route.get('/vieworganization/:id', orgcontroller.viewOneOrganization);
route.get('/viewallorganization', orgcontroller.viewAllOrganizations);
route.put('/updateorganization/:id',orgcontroller.uploadimg,  orgcontroller.updateOrganizationDetails);
route.post('/organization/forgotpassword', orgcontroller.forgotPassword);
route.put('/toactivateorg/:id',orgcontroller.uploadimg,  orgcontroller.activateOrganization);
route.put('/todeactivateorg/:id',orgcontroller.uploadimg,  orgcontroller.deactivateOrganization);

route.post('/product/add', productController.uploadimg, productController.addProduct);
route.get('/product/all', productController.viewAllProducts);
route.get('/product/:id', productController.viewOneProduct);
route.delete('/product/delete/:id', productController.deleteProduct);
route.put('/product/update/:id', productController.uploadimg, productController.updateProduct);
route.get('/ourproduct/:ownerId', productController.getProductsByOwner );
route.post('/addRating/:productId', productController.addRating);

// Swap Request Routes
route.post('/swap/request', productController.createSwapRequest);
route.get('/swap/pending/:userId', productController.viewSwapPendingRequests);
route.get('/swap/accepted/:userId', productController.viewSwapAcceptedRequests);
route.put('/swap/accept/:requestId', productController.acceptSwapRequest);

// In your Express router
route.delete('/swap/reject/:requestId', productController.rejectSwapRequest);

// order
route.post("/buyProduct", productController.buyProduct);
route.get("/viewOrdersForOwner/:ownerId", productController.viewOrdersForOwner);
route.get("/orderHistory/:buyerId", productController.viewOrderHistory);
route.put("/updateOrderStatus/:orderId", productController.updateOrderStatus);

//wishlist
route.post('/wishlist/add', wishlistController.addToWishlist);
route.post('/wishlist/remove', wishlistController.removeFromWishlist);
route.get('/wishlist/:userId', wishlistController.getWishlistByUser)

// event

route.post('/events',eventController.uploadimg , eventController.createEvent);
route.get('/allevents', eventController.getAllEvents);
route.get('/events/upcoming', eventController.getUpcomingEvents);
route.get('/events/:id', eventController.getEventById);
route.put('/events/:id', eventController.uploadimg , eventController.updateEvent);
route.delete('/events/:id', eventController.deleteEvent);
route.get('/events/organizer/:organizerId', eventController.viewEventsByOrganizer);

// complained
route.post('/addComplaint', complaintController.addComplaint);
route.get('/allComplaints', complaintController.viewAllComplaints);
route.get('/userComplaints', complaintController.viewUserComplaints);
route.get('/organizationComplaints', complaintController.viewOrganizationComplaints);
route.get('/complaint/:id', complaintController.viewComplaintById);
route.get('/complaints/user/:userId', complaintController.viewComplaintByUserId);
route.get('/complaints/organization/:organizationId', complaintController.viewComplaintByOrganizationId);


route.post("/send", chatController.sendMessage);
route.get("/product-chat", chatController.getChatByProduct);
route.get("/user-chats/:userId", chatController.getAllChatsForUser);

module.exports = route;