SELECT
   MAX(cnt)
FROM
 (
   SELECT
      user_id,
      COUNT(*) AS cnt
   FROM 
    (
      SELECT 
      user_id,
        on_diet,
        SUM(CASE WHEN on_diet <> 1 THEN 1 END) 
        OVER (PARTITION BY user_id 
              ORDER BY date_meal 
              ROWS UNBOUNDED PRECEDING) AS dummy
      FROM meals
    ) dt
   WHERE on_diet = 1
   and user_id = 'f121e3c0-8821-491a-be2c-ef7daedf3065'	
   GROUP BY dummy
 ) dt