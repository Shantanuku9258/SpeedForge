package com.SpeedType.SpeedType;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class TypingResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private int wpm;
    private int accuracy;
    private double timeSeconds;

    private LocalDateTime timestamp; // ✅ Added for Last Test Date

    // Automatically set timestamp before saving
    @PrePersist
    public void prePersist() {
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public int getWpm() { return wpm; }
    public void setWpm(int wpm) { this.wpm = wpm; }

    public int getAccuracy() { return accuracy; }
    public void setAccuracy(int accuracy) { this.accuracy = accuracy; }

    public double getTimeSeconds() { return timeSeconds; }
    public void setTimeSeconds(double timeSeconds) { this.timeSeconds = timeSeconds; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
