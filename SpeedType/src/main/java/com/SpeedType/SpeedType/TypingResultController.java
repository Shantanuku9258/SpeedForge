package com.SpeedType.SpeedType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*") // Allow frontend access
public class TypingResultController {

    @Autowired
    private TypingResultRepository repository;

    @PostMapping
    public TypingResult save(@RequestBody TypingResult result) {
        return repository.save(result);
    }

    @GetMapping
    public List<TypingResult> getAll() {
        return repository.findAll();
    }
}
