-- Inserting test authors.
INSERT INTO public.authors
    ("name", created_at, updated_at)
VALUES
    ('Walt Disney', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mark Twain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Albert Einstein', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserting test quotes.
INSERT INTO public.quotes
    (author_id, quote, created_at, updated_at)
VALUES
    (1, 'The more you like yourself, the less you are like anyone else, which makes you unique.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 'Disneyland is a work of love. We didn''t go into Disneyland just with the idea of making money.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (1, 'I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'The secret of getting ahead is getting started.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Part of the secret of a success in life is to eat what you like and let the food fight it out inside.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'You can''t depend on your eyes when your imagination is out of focus.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Look deep into nature, and then you will understand everything better.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'The only source of knowledge is experience.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
