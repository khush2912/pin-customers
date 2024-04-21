const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Assuming db.json contains your data
const middlewares = jsonServer.defaults();

// Custom route handler for pins endpoint
router.render = (req, res) => {
  if (req.url === '/pins' && req.method === 'GET') {
    const pins = res.locals.data;
    const customers = router.db.get('customers').value();

    // Map pins array to include customer data
    const pinsWithCustomers = pins.map(pin => {
      const customerObjects = pin.customerIds.map(customerId => {
        const customer = customers.find(c => c.id === customerId);
        return customer ? { id: customer.id, name: customer.title } : null;
      });
      return { ...pin, customers: customerObjects.filter(Boolean) };
    });

    // Send modified response
    res.json(pinsWithCustomers);
  } else {
    // For other endpoints, use default behavior
    res.json(res.locals.data);
  }
};

// Use default middlewares
server.use(middlewares);
// Use the router
server.use(router);
// Start server
server.listen(3000, () => {
  console.log('JSON Server is running');
});
