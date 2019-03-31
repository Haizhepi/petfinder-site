package petfinder.site.common.rating;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.RatingElasticsearchRepository;

import java.util.Optional;

@Repository
public class RatingDao {
    @Autowired
    private RatingElasticsearchRepository ratingRepository;

    public Optional<RatingDto> findRating(String id) {
        return ratingRepository.find(id);
    }

    public void save(RatingDto rating) {
        ratingRepository.save(rating);
    }
}
