INSERT INTO public.categories (category)
VALUES 	('Beef'),
	   	('Chicken'),
	   	('Dessert'),
	   	('Lamb'),
		('Miscellaneous'),
       	('Pasta'),
       	('Pork'),
		('Seafood'),
	   	('Side'),
	   	('Starter'),
		('Vegan'),
       	('Vegetarian'),
       	('Breakfast'),
       	('Goat');


INSERT INTO public.recipes (recipe, category_id)
VALUES 	('Beans and Toast', 12),
       	('Ham and Cheese Sandwich', 5);

INSERT INTO public.instructions (instruction, receipe_id)
VALUES 	('Microwave the beans. Toast the bread.', 1),
       	('Butter the bread. Place ham and cheese on bread.', 2);

INSERT INTO public.ingredients (ingredient, measure, receipe_id)
VALUES 	('baked beans','400g tin', 1),
		('white bread','4 slices', 1),
		('butter','10g', 1),
		('ham','12 slices', 2),
		('white bread','2 slices', 2),
		('cheese slices','2 slices', 2);