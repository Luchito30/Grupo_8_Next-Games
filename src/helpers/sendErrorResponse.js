module.exports = (res, { status, message }) => {
    const msg = message || "SERVER ERROR";
    const sts = status || 500;
    try {
      res.status(sts).json({ ok: false, message: msg });
    } catch (err) {
      // Handle any potential errors that occur during the response sending process
      console.error(err);
    }
    
  };