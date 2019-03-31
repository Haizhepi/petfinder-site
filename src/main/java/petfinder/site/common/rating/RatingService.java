package petfinder.site.common.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingService {
    @Autowired
    private RatingDao ratingDao;
    public Optional<RatingDto> findRating(String id) {
        return ratingDao.findRating(id);
    }
    public RatingDto save(RatingDto rating) {
        ratingDao.save(rating);
        return rating;
    }
}
