SELECT id, strftime('%Y-%m', createdAt / 1000, 'unixepoch') as created, COUNT(id) as count
FROM Branch 
WHERE userId = :userId
GROUP BY created
ORDER BY id desc