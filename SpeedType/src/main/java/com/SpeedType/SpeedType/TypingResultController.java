package com.SpeedType.SpeedType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend access
public class TypingResultController {

    @Autowired
    private TypingResultRepository repository;

    // Save typing result
    @PostMapping("/results")
    public TypingResult save(@RequestBody TypingResult result) {
        return repository.save(result);
    }

    // Get all typing results
    @GetMapping("/results")
    public List<TypingResult> getAll() {
        return repository.findAll();
    }

    // ✅ Get leaderboard data
    @GetMapping("/leaderboard")
    public List<LeaderboardEntry> getLeaderboard() {
        return repository.getLeaderboard();
    }
}
