package petfinder.site.common.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import petfinder.site.elasticsearch.BookingElasticsearchRepository;

import java.util.Optional;

@Repository
public class BookingDao {
    @Autowired
    private BookingElasticsearchRepository bookingElasticsearchRepository;

    public Optional<BookingDto> findBooking(String id) {
        return bookingElasticsearchRepository.find(id);
    }

    public void save(BookingDto booking) {
        bookingElasticsearchRepository.save(booking);
    }
}
