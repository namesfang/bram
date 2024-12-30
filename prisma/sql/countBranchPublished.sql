SELECT id, strftime('%Y-%m-%d', publishedAt / 1000, 'unixepoch') as published, COUNT(id) as count
FROM Branch 
WHERE userId = :userId AND published BETWEEN :startTime AND :endTime
GROUP BY published 
ORDER BY id asc