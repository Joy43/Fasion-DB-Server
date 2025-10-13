export const orderSwaggerDoc = {
  "/api/v1/orders": {
    post: {
      tags: ["Orders"],
      summary: "Create a new order",
      description: "Allows a user to place an order with one or more products.",
      security: [{ AuthorizationToken: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                shop: { type: "string", example: "652fcb84b0d0d7d34e0a7a99" },
                products: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      product: { type: "string", example: "652fcb84b0d0d7d34e0a7a22" },
                      quantity: { type: "number", example: 2 },
                      unitPrice: { type: "number", example: 250 },
                      color: { type: "string", example: "Red" },
                    },
                  },
                },
                coupon: { type: "string", example: null },
                totalAmount: { type: "number", example: 500 },
                discount: { type: "number", example: 50 },
                deliveryCharge: { type: "number", example: 30 },
                finalAmount: { type: "number", example: 480 },
                shippingAddress: { type: "string", example: "123 Dhaka Street, Bangladesh" },
                paymentMethod: { type: "string", enum: ["Cash", "Card", "Online"], example: "Online" },
              },
              required: [
                "shop",
                "products",
                "totalAmount",
                "finalAmount",
                "shippingAddress",
                "paymentMethod",
              ],
            },
          },
        },
      },
      responses: {
        201: { description: "Order created successfully" },
        400: { description: "Validation error" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/orders/my-orders": {
    get: {
      tags: ["Orders"],
      summary: "Get user's own orders",
      description: "Fetch all orders placed by the currently logged-in user.",
      security: [{ AuthorizationToken: [] }],
      responses: {
        200: { description: "Orders fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/orders/my-shop-orders": {
    get: {
      tags: ["Orders"],
      summary: "Get orders for user's shop",
      description: "Fetch all orders related to the user's shop (for shop owners).",
      security: [{ AuthorizationToken: [] }],
      responses: {
        200: { description: "Shop orders fetched successfully" },
        401: { description: "Unauthorized" },
      },
    },
  },

  "/api/v1/orders/{orderId}": {
    get: {
      tags: ["Orders"],
      summary: "Get order details",
      description: "Retrieve detailed information about a specific order by ID.",
      security: [{ AuthorizationToken: [] }],
      parameters: [
        {
          name: "orderId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "MongoDB ObjectId of the order",
          example: "652fcb84b0d0d7d34e0a7b11",
        },
      ],
      responses: {
        200: { description: "Order details fetched successfully" },
        404: { description: "Order not found" },
      },
    },
  },

  "/api/v1/orders/{orderId}/status": {
    patch: {
      tags: ["Orders"],
      summary: "Change order status",
      description: "Allows updating an order’s status (Pending, Processing, Completed, Cancelled).",
      security: [{ AuthorizationToken: [] }],
      parameters: [
        {
          name: "orderId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Order ID",
          example: "652fcb84b0d0d7d34e0a7b11",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["Pending", "Processing", "Completed", "Cancelled"],
                  example: "Completed",
                },
              },
              required: ["status"],
            },
          },
        },
      },
      responses: {
        200: { description: "Order status updated successfully" },
        400: { description: "Invalid status or bad request" },
        401: { description: "Unauthorized" },
      },
    },
  },
};
