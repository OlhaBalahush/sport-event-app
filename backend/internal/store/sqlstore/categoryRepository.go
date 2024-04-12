package sqlstore

import (
	"log"
	"sport-event-app/backend/internal/models"
)

type CategoryRepository struct {
	store *Store
}


// CreateCategory inserts a new category into the database
func (cr *CategoryRepository) Create(category *models.Category) (int, error) {
	var id int
    err := cr.store.db.QueryRow("INSERT INTO categories (name) VALUES ($1) RETURNING id", category.Name).Scan(&id)
    if err != nil {
        log.Println("Failed to create category:", err)
        return 0, err
    }
    return id, nil
}

// GetCategoryByID retrieves a category from the database by ID
func (cr *CategoryRepository) FindByID(id int) (*models.Category, error) {
	row := cr.store.db.QueryRow("SELECT id, name FROM categories WHERE id = $1", id)
	category := &models.Category{}
	err := row.Scan(&category.ID, &category.Name)
	if err != nil {
		log.Println("Failed to get category by ID:", err)
		return nil, err
	}
	return category, nil
}

// GetAllCategories retrieves all categories from the database
func (cr *CategoryRepository) Read() ([]*models.Category, error) {
	rows, err := cr.store.db.Query("SELECT id, name FROM categories")
	if err != nil {
		log.Println("Failed to get all categories:", err)
		return nil, err
	}
	defer rows.Close()

	var categories []*models.Category
	for rows.Next() {
		category := &models.Category{}
		err := rows.Scan(&category.ID, &category.Name)
		if err != nil {
			log.Println("Failed to scan category row:", err)
			return nil, err
		}
		categories = append(categories, category)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over category rows:", err)
		return nil, err
	}

	return categories, nil
}

// UpdateCategory updates an existing category in the database
func (cr *CategoryRepository) Update(category *models.Category) error {
	_, err := cr.store.db.Exec("UPDATE categories SET name=$1 WHERE id=$2", category.Name, category.ID)
	if err != nil {
		log.Println("Failed to update category:", err)
		return err
	}
	return nil
}

// DeleteCategory deletes an existing category from the database
func (cr *CategoryRepository) Delete(id int) error {
	_, err := cr.store.db.Exec("DELETE FROM categories WHERE id=$1", id)
	if err != nil {
		log.Println("Failed to delete category:", err)
		return err
	}
	return nil
}

// GetCategoriesByUserID retrieves all categories associated with a specific user ID
func (cr *CategoryRepository) GetByFRID(id string, flag string) ([]*models.Category, error) {
	// Prepare the SQL query
	query := `
	SELECT c.name
	FROM category_relation cr
	JOIN categories c ON cr.category_id = c.id
	WHERE cr.flag = $1 AND
		  CASE
			  WHEN $1 = 'user' THEN cr.user_id::text = $2
			  WHEN $1 = 'event' THEN cr.event_id::text = $2
			  WHEN $1 = 'challenge' THEN cr.challenge_id::text = $2
		  END
	`

	// Execute the query
	rows, err := cr.store.db.Query(query, flag, id)
	if err != nil {
		log.Println("Failed to execute query:", err)
		return nil, err
	}
	defer rows.Close()

	// Iterate over the rows and collect category names
	var categories []*models.Category
	for rows.Next() {
		category := &models.Category{}
		if err := rows.Scan(&category); err != nil {
			log.Println("Failed to scan row:", err)
			return nil, err
		}
		categories = append(categories, category)
	}
	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return categories, nil
}
