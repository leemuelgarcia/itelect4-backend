import { Router, Request, Response } from "express";
import { Booking } from "../models/Booking.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

// CREATE — POST /api/bookings
router.post("/", async (req: Request, res: Response) => {
  try {
    const { sessionId, learningGoal } = req.body;

    if (!sessionId || !learningGoal) {
      res.status(400).json({
        message: "Session ID and learning goal are required",
      });
      return;
    }

    const booking = await Booking.create({
      sessionId,
      tuteeId: req.userId,
      learningGoal,
      status: "requested",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Server error while creating booking",
    });
  }
});

// READ ALL — GET /api/bookings
router.get("/", async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({
      tuteeId: req.userId,
    });

    res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Server error while retrieving bookings",
    });
  }
});

// READ ONE — GET /api/bookings/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      tuteeId: req.userId,
    });

    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);

    res.status(500).json({
      message: "Server error while retrieving booking",
    });
  }
});

// UPDATE — PUT /api/bookings/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { learningGoal, status } = req.body;

    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        tuteeId: req.userId,
      },
      {
        learningGoal,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);

    res.status(500).json({
      message: "Server error while updating booking",
    });
  }
});

// DELETE — DELETE /api/bookings/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      tuteeId: req.userId,
    });

    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    res.status(500).json({
      message: "Server error while deleting booking",
    });
  }
});

export default router;