package com.SpeedType.SpeedType;

public class LeaderboardEntry {
    private String username;
    private double averageWpm;
    private double averageAccuracy;

    public LeaderboardEntry(String username, double averageWpm, double averageAccuracy) {
        this.username = username;
        this.averageWpm = averageWpm;
        this.averageAccuracy = averageAccuracy;
    }

    public String getUsername() { return username; }
    public double getAverageWpm() { return averageWpm; }
    public double getAverageAccuracy() { return averageAccuracy; }
}
