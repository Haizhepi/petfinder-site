package petfinder.site.common.booking;

import alloy.util.Momento;

import java.util.UUID;

public class BookingDto implements Momento<String> {

    private String id;
    private String owner;
    private String sitter;
    private String petId;
    private String time;
    public BookingDto() {
        // Randomly generate an id when constructing a pet object.
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }

    public BookingDto(String owner, String sitter, String petId, String time, String description) {
        this.owner = owner;
        this.sitter = sitter;
        this.petId = petId;
        this.time = time;
        this.description = description;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getSitter() {
        return sitter;
    }

    public void setSitter(String sitter) {
        this.sitter = sitter;
    }

    public String getPetId() {
        return petId;
    }

    public void setPetId(String petId) {
        this.petId = petId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private String description;
    @Override
    public String getMomento() {
        return id;
    }

}
