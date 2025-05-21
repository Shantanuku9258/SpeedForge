package com.SpeedType.SpeedType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {

    // 🔝 Leaderboard sorted by average WPM desc (aggregated by username)
    @Query("SELECT new com.SpeedType.SpeedType.LeaderboardEntry(t.username, AVG(t.wpm), AVG(t.accuracy)) " +
           "FROM TypingResult t GROUP BY t.username ORDER BY AVG(t.wpm) DESC")
    List<LeaderboardEntry> getLeaderboard();

    // 🧮 Count how many tests a user has taken
    @Query("SELECT COUNT(t) FROM TypingResult t WHERE t.username = :username")
    long countByUsername(String username);

    // 🏆 Get latest result for a user (optional for displaying streaks/improvement)
    TypingResult findTopByUsernameOrderByTimestampDesc(String username);

    // Optional: Get all results ordered by wpm desc, accuracy desc, timestamp desc
    @Query("SELECT t FROM TypingResult t ORDER BY t.wpm DESC, t.accuracy DESC, t.timestamp DESC")
    List<TypingResult> findTopResults();
}
