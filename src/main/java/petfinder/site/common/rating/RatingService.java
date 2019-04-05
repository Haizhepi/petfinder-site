package petfinder.site.common.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {
    @Autowired
    private RatingDao ratingDao;
    public Optional<RatingDto> findRating(String id) {
        return ratingDao.findRating(id);
    }
    public RatingDto save(RatingDto rating) {
        RatingDto rat = rating;
        Optional<RatingDto> temp = ratingDao.findRating(rating.getId());
        if (temp.isPresent()) {
            rat = temp.get();
        }
        ratingDao.save(rat);
        return rat;
    }

    public List<RatingDto> findRatingByUserID(String principal) {
        List<RatingDto> res = ratingDao.findRatingByPrinciple(principal);
        return res;
    }
}
