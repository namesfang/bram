SELECT id, strftime('%Y-%m-%d', createdAt / 1000, 'unixepoch') as created, COUNT(id) as count
FROM Branch 
WHERE userId = :userId AND created BETWEEN :startTime AND :endTime
GROUP BY created 
ORDER BY id asc