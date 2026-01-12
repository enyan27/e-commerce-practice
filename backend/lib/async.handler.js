export const asyncHandler = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    };
};